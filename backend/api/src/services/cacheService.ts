import { createClient } from 'redis';
import { env } from '../config/env';

const redisClient = createClient({
  url: env.redisUrl,
});

redisClient.on('error', (error) => {
  console.error('Redis cache error', error);
});

export const cacheService = {
  async get<T>(key: string): Promise<T | null> {
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
      const value = await redisClient.get(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch {
      return null;
    }
  },

  async set<T>(key: string, value: T, ttlSeconds = 300): Promise<void> {
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
      await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
    } catch {
      // Graceful fallback for offline or restricted redis environments.
    }
  },

  async del(key: string): Promise<void> {
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }
      await redisClient.del(key);
    } catch {
      // Intentionally ignored.
    }
  },
};
