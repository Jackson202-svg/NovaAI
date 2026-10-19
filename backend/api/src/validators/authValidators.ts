import type { Request, Response } from 'express';
import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(2).max(100).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const chatRequestSchema = z.object({
  message: z.string().min(1).max(20000),
  conversationId: z.string().optional(),
  model: z.string().optional(),
  context: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    }),
  ).optional(),
});

export const createHealthResponse = (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: 'NovaAI API is online',
    service: 'backend/api',
    timestamp: new Date().toISOString(),
  });
};
