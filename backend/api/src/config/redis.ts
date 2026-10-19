import { createClient } from 'redis';
import { env } from './env';

export const redisClient = createClient({
  url: env.redisUrl,
});

redisClient.on('error', (error) => {
  console.error('Redis connection error', error);
});

export const connectRedis = async (): Promise<void> => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};
