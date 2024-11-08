import express, { Router } from 'express';
import { registerController } from '../controllers/registerController';

const router: Router = express.Router();

router.post('/register', (req, res) => registerController(req, res));

export default router;