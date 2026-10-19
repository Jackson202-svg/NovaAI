import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../middleware/errorHandler';
import { issueTokenPair, verifyPassword, hashPassword, trackAuthEvent } from '../services/authService';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  name: z.string().min(2).max(100).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export const signupController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('Invalid signup payload', 400);
    }

    const { email, password, name } = parsed.data;
    const passwordHash = await hashPassword(password);
    const user = {
      id: 'user_' + Math.random().toString(36).slice(2),
      email,
      name: name ?? 'NovaAI User',
      role: 'user',
      passwordHash,
    };

    const tokens = issueTokenPair({ id: user.id, email: user.email, role: user.role });
    trackAuthEvent('signup', user.id);

    res.status(201).json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      ...tokens,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new AppError('Invalid login payload', 400);
    }

    const { email, password } = parsed.data;
    const hash = '$2a$12$1d1txsp8h3nJ2YwSOmnSgOh/gIJf9mI0fP2f6chYNNV7fe26v/Tiq';
    const isValid = await verifyPassword(password, hash);

    if (!isValid || email !== 'demo@novaai.app') {
      throw new AppError('Invalid email or password', 401);
    }

    const user = {
      id: 'demo_user_1',
      email,
      role: 'user',
    };

    const tokens = issueTokenPair(user);
    trackAuthEvent('login', user.id);

    res.status(200).json({
      success: true,
      user: { id: user.id, email, role: user.role },
      ...tokens,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshController = async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    message: 'Refresh token endpoint ready for implementation.',
  });
};
