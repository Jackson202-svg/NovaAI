import express from 'express';
import { chatHealthCheck } from '../validators/chatValidators';
import { chatController } from '../controllers/chatController';
import { requireAuth } from '../middleware/auth';
import { apiRateLimiter } from '../middleware/rateLimit';
import { validate } from '../middleware/validate';
import { chatMessageSchema } from '../validators/chatValidators';

const router = express.Router();

router.get('/health', chatHealthCheck);
router.post('/', apiRateLimiter, requireAuth, validate(chatMessageSchema), chatController);

export default router;
