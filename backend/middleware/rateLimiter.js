const rateLimit = require('express-rate-limit');
const config = require('../config/config');

/**
 * Rate limiter middleware to prevent abuse
 */
const apiLimiter = rateLimit({
  windowMs: config.RATE_LIMIT.windowMs,
  max: config.RATE_LIMIT.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Too many requests, please try again later.'
  }
});

module.exports = apiLimiter;
