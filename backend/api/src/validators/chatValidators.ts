import { z } from 'zod';

export const chatMessageSchema = z.object({
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
