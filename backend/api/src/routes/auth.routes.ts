import express from 'express';
import { apiRateLimiter } from '../middleware/rateLimit.js';
import { validate } from '../middleware/validate.js';
import { signupController, loginController, refreshController } from '../controllers/authController.js';
import { signupSchema, loginSchema } from '../validators/authValidators.js';
import { requireAuth } from '../middleware/auth.js';
import { chatController } from '../controllers/chatController.js';
import { chatRequestSchema } from '../validators/authValidators.js';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ success: true, service: 'novaai-auth', status: 'ok' });
});

router.post('/signup', apiRateLimiter, validate(signupSchema), signupController);
router.post('/login', apiRateLimiter, validate(loginSchema), loginController);
router.post('/refresh', apiRateLimiter, refreshController);
router.post('/chat', apiRateLimiter, requireAuth, validate(chatRequestSchema), chatController);

export default router;
