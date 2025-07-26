import { loginController } from 'Server/controller/userController';

const express = require('express')

const router = express.Router();

router.post('/login', loginController)
module.exports = router;