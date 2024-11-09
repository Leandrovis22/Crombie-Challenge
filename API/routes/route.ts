import { loginController } from "../controllers/loginController";
import { registerController } from '../controllers/registerController';
const express = require('express');

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;