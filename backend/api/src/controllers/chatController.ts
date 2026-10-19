import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../lib/logger';
import { trackAnalyticsEvent } from './analyticsService';
import { appendMessage, createConversation, listConversationHistory } from './conversationService';
import { cacheService } from './cacheService';
import { generateChatResponse } from './aiService';

const bodySchema = z.object({
  message: z.string().min(1).max(20000),
  conversationId: z.string().optional(),
  model: z.string().optional(),
  context: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
      }),
    )
    .optional(),
});

export const chatController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = bodySchema.safeParse(req.body);

    if (!parsed.success) {
      throw new AppError('Invalid chat request payload', 400);
    }

    const { message, conversationId, model, context } = parsed.data;
    const user = (req as any).user;

    if (!user) {
      throw new AppError('Authentication required', 401);
    }

    const cacheKey = `chat:${user.id}:${conversationId ?? 'new'}:${message.slice(0, 120)}`;
    const cached = await cacheService.get<{ reply: string }>(cacheKey);

    if (cached?.reply) {
      res.status(200).json({ success: true, reply: cached.reply, cached: true });
      return;
    }

    const activeConversationId = conversationId ?? createConversation(user.id).id;
    appendMessage(activeConversationId, { role: 'user', content: message });

    const reply = await generateChatResponse({
      message,
      conversationId: activeConversationId,
      model,
      context,
    });

    appendMessage(activeConversationId, { role: 'assistant', content: reply });

    await cacheService.set(cacheKey, { reply }, 300);
    trackAnalyticsEvent('chat.completed', {
      userId: user.id,
      conversationId: activeConversationId,
      model: model ?? 'default',
      messageLength: message.length,
    });

    logger.info({ conversationId: activeConversationId, userId: user.id }, 'Chat response generated');

    const history = listConversationHistory(activeConversationId);

    res.status(200).json({
      success: true,
      conversationId: activeConversationId,
      reply,
      history,
      cached: false,
    });
  } catch (error) {
    next(error);
  }
};
