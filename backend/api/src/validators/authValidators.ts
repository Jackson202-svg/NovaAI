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
  context: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant', 'system']),
        content: z.string(),
      }),
    )
    .optional(),
});
