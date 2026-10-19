import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../middleware/errorHandler';
import { logger } from '../lib/logger';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export const hashPassword = async (plainText: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(plainText, saltRounds);
};

export const verifyPassword = async (plainText: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plainText, hash);
};

export const issueTokenPair = (user: { id: string; email: string; role: string }): TokenPair => {
  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  );

  const refreshToken = jwt.sign(
    { sub: user.id, type: 'refresh' },
    env.jwtRefreshSecret,
    { expiresIn: env.jwtRefreshExpiresIn },
  );

  return { accessToken, refreshToken };
};

export const trackAuthEvent = (event: string, userId?: string): void => {
  logger.info({ event, userId }, 'Auth event tracked');
};

export const assertUserCanAccessResource = (
  userRole: string,
  requiredRole: string,
): void => {
  if (userRole !== requiredRole && userRole !== 'admin') {
    throw new AppError('Forbidden: insufficient permissions', 403);
  }
};
