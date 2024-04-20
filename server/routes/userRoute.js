import express from 'express';
import { testRoute } from '../controllers/user.js';

const router = express.Router();
router.get('/test', testRoute);

export default router;
