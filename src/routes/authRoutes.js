const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/users', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
