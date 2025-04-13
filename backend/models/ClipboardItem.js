const mongoose = require('mongoose');

const clipboardItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: mongoose.Schema.Types.Mixed, // Can be String or Buffer (for images)
    required: true
  },
  contentType: {
    type: String,
    enum: ['text', 'image'],
    required: true,
    index: true
  },
  sourceUrl: {
    type: String,
    required: true
  },
  sourceTitle: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      'Code Snippet',
      'URL',
      'Email Address',
      'Phone Number',
      'Physical Address',
      'Quote',
      'Image',
      'Plain Text',
      'Uncategorized'
    ],
    default: 'Uncategorized',
    index: true
  },
  isFavorite: {
    type: Boolean,
    default: false,
    index: true
  },
  contentHash: {
    type: String,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Create compound index for userId + createdAt for efficient queries
clipboardItemSchema.index({ userId: 1, createdAt: -1 });

// Create compound index for userId + category for filtered queries
clipboardItemSchema.index({ userId: 1, category: 1 });

// Create compound index for userId + isFavorite for favorites filter
clipboardItemSchema.index({ userId: 1, isFavorite: 1 });

// Create text index for content search
clipboardItemSchema.index({ content: 'text', sourceTitle: 'text', sourceUrl: 'text' }, 
  { weights: { content: 10, sourceTitle: 5, sourceUrl: 3 } });

const ClipboardItem = mongoose.model('ClipboardItem', clipboardItemSchema);

module.exports = ClipboardItem;
