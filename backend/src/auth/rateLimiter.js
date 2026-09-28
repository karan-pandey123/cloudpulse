const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 requests per window
  message: { message: 'Too many attempts, please try again after 15 minutes' },
});

module.exports = authLimiter;