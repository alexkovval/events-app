import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const router = Router();

router.post('/', AuthController.getUser);

export default router;