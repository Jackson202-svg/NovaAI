import { config } from 'dotenv';
config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import apiRouter from './routes/index.js';
import { env } from './config/env.js';
import { logger } from './lib/logger.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: env.frontendOrigin, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    service: env.appName,
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

const port = env.port;
app.listen(port, () => {
  logger.info(`NovaAI API listening on ${port}`);
});

export default app;
