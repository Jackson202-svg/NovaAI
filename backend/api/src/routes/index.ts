import express from 'express';
import { createHealthResponse } from '../validators/authValidators';

const router = express.Router();

router.get('/health', createHealthResponse);

export default router;
