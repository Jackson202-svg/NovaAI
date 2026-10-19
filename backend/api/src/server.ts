import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRouter from './routes';
import { apiRateLimiter } from './middleware/rateLimit';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { logger } from './lib/logger';
import { env } from './config/env';

const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: env.frontendOrigin,
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(apiRateLimiter);

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    service: env.appName,
    status: 'ok',
  });
});

app.use('/api', apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT ?? 4000, () => {
  logger.info(`NovaAI API listening on port ${process.env.PORT ?? 4000}`);
});

export default app;
