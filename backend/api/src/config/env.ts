import dotenv from 'dotenv';

dotenv.config();

const getEnv = (key: string, fallback?: string): string => {
  const value = process.env[key];
  if (value === undefined || value === '') {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env = {
  nodeEnv: getEnv('NODE_ENV', 'development'),
  port: Number(getEnv('PORT', '4000')),
  appName: getEnv('APP_NAME', 'NovaAI'),
  apiBaseUrl: getEnv('API_BASE_URL', 'http://localhost:4000'),
  jwtSecret: getEnv('JWT_SECRET', 'dev-secret-change-me'),
  jwtRefreshSecret: getEnv('JWT_REFRESH_SECRET', 'dev-refresh-secret-change-me'),
  jwtExpiresIn: getEnv('JWT_EXPIRES_IN', '15m'),
  jwtRefreshExpiresIn: getEnv('JWT_REFRESH_EXPIRES_IN', '7d'),
  dbHost: getEnv('DB_HOST', 'localhost'),
  dbPort: Number(getEnv('DB_PORT', '5432')),
  dbName: getEnv('DB_NAME', 'novaai'),
  dbUser: getEnv('DB_USER', 'novaai'),
  dbPassword: getEnv('DB_PASSWORD', 'novaai'),
  mongoUri: getEnv('MONGO_URI', 'mongodb://localhost:27017/novaai'),
  redisUrl: getEnv('REDIS_URL', 'redis://localhost:6379'),
  openAiApiKey: process.env.OPENAI_API_KEY ?? '',
  openAiModel: getEnv('OPENAI_MODEL', 'gpt-4o-mini'),
  openAiBaseUrl: getEnv('OPENAI_BASE_URL', 'https://api.openai.com/v1'),
  stripeSecretKey: process.env.STRIPE_SECRET_KEY ?? '',
  frontendOrigin: process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000',
};
