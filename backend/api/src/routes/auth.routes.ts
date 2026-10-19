import express from 'express';
import { requireAuth } from '../middleware/auth';
import { apiRateLimiter, authRateLimiter } from '../middleware/rateLimit';
import { validate } from '../middleware/validate';
import { loginSchema, signupSchema } from '../validators/authValidators';
import { chatRequestSchema } from '../validators/authValidators';
import { loginController, signupController, refreshController } from './authController';
import { chatController } from './chatController';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, service: 'novaai-auth' });
});

router.post('/signup', authRateLimiter, validate(signupSchema), signupController);
router.post('/login', authRateLimiter, validate(loginSchema), loginController);
router.post('/refresh', authRateLimiter, refreshController);
router.post('/chat', apiRateLimiter, requireAuth, validate(chatRequestSchema), chatController);

export default router;
