import express from 'express';
import { chatMessageSchema } from '../validators/chatValidators.js';
import { chatController } from '../controllers/chatController.js';
import { requireAuth } from '../middleware/auth.js';
import { apiRateLimiter } from '../middleware/rateLimit.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ success: true, service: 'novaai-chat', status: 'ok' });
});

router.post('/', apiRateLimiter, requireAuth, validate(chatMessageSchema), chatController);

export default router;
