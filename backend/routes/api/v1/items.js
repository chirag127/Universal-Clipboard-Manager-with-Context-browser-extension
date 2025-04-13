const express = require('express');
const router = express.Router();
const { 
  createItem, 
  getItems, 
  deleteItem, 
  deleteAllItems, 
  toggleFavorite,
  updateRetentionSettings
} = require('../../../controllers/itemController');
const { validateUserId } = require('../../../middleware/auth');

// Apply user ID validation to all routes
router.use(validateUserId);

// Clipboard item routes
router.route('/')
  .post(createItem)
  .get(getItems)
  .delete(deleteAllItems);

router.route('/:id')
  .delete(deleteItem);

router.route('/:id/favorite')
  .put(toggleFavorite);

// Settings routes
router.route('/settings/retention')
  .put(updateRetentionSettings);

module.exports = router;
