import { homeController } from "../controllers/homeController";
import { loginController } from "../controllers/loginController";
import { registerController } from '../controllers/registerController';
import { authenticateToken } from "../middlewares/authMiddleware";
const express = require('express');

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/home', authenticateToken, homeController);

module.exports = router;