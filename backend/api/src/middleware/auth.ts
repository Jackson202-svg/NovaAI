import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from './errorHandler';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Authorization token missing or invalid', 401));
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, env.jwtSecret) as {
      sub: string;
      email: string;
      role: string;
    };

    (req as AuthenticatedRequest).user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
};
