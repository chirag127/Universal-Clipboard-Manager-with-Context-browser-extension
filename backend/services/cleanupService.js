const ClipboardItem = require('../models/ClipboardItem');

/**
 * Cleans up old clipboard items based on user settings
 * @param {string} userId - The user ID
 * @param {Object} settings - The user's retention settings
 * @param {number} settings.maxItems - Maximum number of items to keep
 * @param {number} settings.maxDays - Maximum number of days to keep items
 * @returns {Promise<number>} - Number of items deleted
 */
const cleanupOldItems = async (userId, settings) => {
  try {
    const { maxItems, maxDays } = settings;
    let deletedCount = 0;

    // Delete items older than maxDays
    if (maxDays && maxDays > 0) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - maxDays);

      const result = await ClipboardItem.deleteMany({
        userId,
        createdAt: { $lt: cutoffDate },
        isFavorite: false // Don't delete favorited items
      });

      deletedCount += result.deletedCount;
    }

    // Keep only the most recent maxItems
    if (maxItems && maxItems > 0) {
      // Get total count of user's items (excluding favorites)
      const totalCount = await ClipboardItem.countDocuments({
        userId,
        isFavorite: false
      });

      if (totalCount > maxItems) {
        // Find the cutoff date for the oldest items to keep
        const itemsToDelete = totalCount - maxItems;
        
        // Find the oldest items to delete
        const itemsToDeleteIds = await ClipboardItem.find({
          userId,
          isFavorite: false
        })
        .sort({ createdAt: 1 })
        .limit(itemsToDelete)
        .select('_id');

        if (itemsToDeleteIds.length > 0) {
          const result = await ClipboardItem.deleteMany({
            _id: { $in: itemsToDeleteIds.map(item => item._id) }
          });

          deletedCount += result.deletedCount;
        }
      }
    }

    return deletedCount;
  } catch (error) {
    console.error('Error cleaning up old items:', error);
    throw error;
  }
};

module.exports = {
  cleanupOldItems
};
