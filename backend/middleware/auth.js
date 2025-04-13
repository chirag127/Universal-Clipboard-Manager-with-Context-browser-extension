/**
 * Authentication middleware to validate user ID
 */
const validateUserId = (req, res, next) => {
  const userId = req.headers['x-user-id'];

  if (!userId) {
    return res.status(401).json({ message: 'User ID is required' });
  }

  // Validate userId format (UUID v4 format)
  const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidV4Regex.test(userId)) {
    return res.status(401).json({ message: 'Invalid User ID format' });
  }

  // Add userId to request object
  req.userId = userId;
  next();
};

module.exports = {
  validateUserId
};
