const express = require('express');
const router = express.Router();
const { signup, login } = require('./auth.controller');
const authLimiter = require('./rateLimiter');
const { signupValidation, loginValidation, validate } = require('./auth.validator');

router.post('/signup', authLimiter, signupValidation, validate, signup);
router.post('/login', authLimiter, loginValidation, validate, login);

module.exports = router;