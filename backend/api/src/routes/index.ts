import express from 'express';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.status(200).json({ success: true, service: 'novaai-api', status: 'ok' });
});

export default router;
