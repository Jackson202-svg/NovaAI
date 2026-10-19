import { Pool } from 'pg';
import { env } from './env';

export const postgresPool = new Pool({
  host: env.dbHost,
  port: env.dbPort,
  database: env.dbName,
  user: env.dbUser,
  password: env.dbPassword,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

postgresPool.on('error', () => {
  // Intentionally silent in non-production to avoid noise during startup.
});

export const query = async <T>(text: string, params?: unknown[]): Promise<T[]> => {
  const result = await postgresPool.query<T>(text, params);
  return result.rows;
};
