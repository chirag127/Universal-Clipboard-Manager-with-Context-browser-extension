const ClipboardItem = require('../models/ClipboardItem');
const aiService = require('../services/aiService');
const cleanupService = require('../services/cleanupService');
const crypto = require('crypto');

/**
 * Create a new clipboard item
 * @route POST /api/v1/items
 * @access Private
 */
const createItem = async (req, res) => {
  try {
    const { content, contentType, sourceUrl, sourceTitle } = req.body;
    const userId = req.userId;

    // Validate required fields
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
    if (!contentType || !['text', 'image'].includes(contentType)) {
      return res.status(400).json({ message: 'Valid contentType is required (text or image)' });
    }
    if (!sourceUrl) {
      return res.status(400).json({ message: 'Source URL is required' });
    }

    // Generate content hash for potential deduplication
    const contentHash = crypto
      .createHash('md5')
      .update(typeof content === 'string' ? content : content.toString('base64'))
      .digest('hex');

    // Check for duplicate content from the same user and source
    const existingItem = await ClipboardItem.findOne({
      userId,
      contentHash,
      sourceUrl
    });

    if (existingItem) {
      // Update timestamp of existing item instead of creating a duplicate
      existingItem.createdAt = new Date();
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    // Create new item with initial category
    const newItem = new ClipboardItem({
      userId,
      content,
      contentType,
      sourceUrl,
      sourceTitle: sourceTitle || sourceUrl,
      category: contentType === 'image' ? 'Image' : 'Uncategorized',
      contentHash
    });

    // Save the item
    await newItem.save();

    // For text content, categorize asynchronously
    if (contentType === 'text' && typeof content === 'string') {
      // Don't await this to avoid blocking the response
      (async () => {
        try {
          const category = await aiService.categorizeContent(content);
          await ClipboardItem.findByIdAndUpdate(newItem._id, { category });
        } catch (error) {
          console.error('Error in async categorization:', error);
        }
      })();
    }

    // Cleanup old items based on user settings (default: 500 items, 30 days)
    // This is done asynchronously to avoid blocking the response
    (async () => {
      try {
        await cleanupService.cleanupOldItems(userId, {
          maxItems: 500,
          maxDays: 30
        });
      } catch (error) {
        console.error('Error in cleanup service:', error);
      }
    })();

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating clipboard item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all clipboard items for a user with filtering and pagination
 * @route GET /api/v1/items
 * @access Private
 */
const getItems = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      page = 1,
      limit = 20,
      search,
      category,
      contentType,
      favorite,
      startDate,
      endDate,
      domain
    } = req.query;

    // Build query
    const query = { userId };

    // Add filters if provided
    if (category) {
      query.category = category;
    }
    if (contentType) {
      query.contentType = contentType;
    }
    if (favorite === 'true') {
      query.isFavorite = true;
    }
    if (startDate) {
      query.createdAt = { ...query.createdAt, $gte: new Date(startDate) };
    }
    if (endDate) {
      query.createdAt = { ...query.createdAt, $lte: new Date(endDate) };
    }
    if (domain) {
      query.sourceUrl = { $regex: domain, $options: 'i' };
    }

    // Text search if provided
    let findQuery;
    if (search) {
      findQuery = ClipboardItem.find({
        $and: [
          query,
          {
            $or: [
              { content: { $regex: search, $options: 'i' } },
              { sourceTitle: { $regex: search, $options: 'i' } },
              { sourceUrl: { $regex: search, $options: 'i' } }
            ]
          }
        ]
      });
    } else {
      findQuery = ClipboardItem.find(query);
    }

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with pagination
    const items = await findQuery
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .exec();

    // Get total count for pagination
    const total = await ClipboardItem.countDocuments(query);

    res.json({
      items,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error getting clipboard items:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete a clipboard item
 * @route DELETE /api/v1/items/:id
 * @access Private
 */
const deleteItem = async (req, res) => {
  try {
    const userId = req.userId;
    const itemId = req.params.id;

    // Find and delete the item
    const item = await ClipboardItem.findOneAndDelete({
      _id: itemId,
      userId
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting clipboard item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete all clipboard items for a user
 * @route DELETE /api/v1/items
 * @access Private
 */
const deleteAllItems = async (req, res) => {
  try {
    const userId = req.userId;
    const { keepFavorites } = req.query;

    // Build query
    const query = { userId };
    if (keepFavorites === 'true') {
      query.isFavorite = false;
    }

    // Delete items
    const result = await ClipboardItem.deleteMany(query);

    res.json({
      message: `${result.deletedCount} items deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting all clipboard items:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Toggle favorite status of a clipboard item
 * @route PUT /api/v1/items/:id/favorite
 * @access Private
 */
const toggleFavorite = async (req, res) => {
  try {
    const userId = req.userId;
    const itemId = req.params.id;

    // Find the item
    const item = await ClipboardItem.findOne({
      _id: itemId,
      userId
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Toggle favorite status
    item.isFavorite = !item.isFavorite;
    await item.save();

    res.json({
      message: `Item ${item.isFavorite ? 'added to' : 'removed from'} favorites`,
      isFavorite: item.isFavorite
    });
  } catch (error) {
    console.error('Error toggling favorite status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update user settings for data retention
 * @route PUT /api/v1/settings/retention
 * @access Private
 */
const updateRetentionSettings = async (req, res) => {
  try {
    const userId = req.userId;
    const { maxItems, maxDays } = req.body;

    // Validate settings
    if ((maxItems && maxItems < 0) || (maxDays && maxDays < 0)) {
      return res.status(400).json({ message: 'Invalid settings values' });
    }

    // Apply cleanup with new settings
    const deletedCount = await cleanupService.cleanupOldItems(userId, {
      maxItems: maxItems || 500,
      maxDays: maxDays || 30
    });

    res.json({
      message: 'Retention settings updated',
      deletedCount,
      settings: {
        maxItems: maxItems || 500,
        maxDays: maxDays || 30
      }
    });
  } catch (error) {
    console.error('Error updating retention settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  deleteAllItems,
  toggleFavorite,
  updateRetentionSettings
};
