const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config/config');

// Initialize the Google Generative AI with API key
const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);

// Gemini model to use
const MODEL_NAME = 'gemini-pro'; // Using gemini-pro as a fallback if the experimental model isn't available

/**
 * Categorizes text content using Gemini AI
 * @param {string} content - The text content to categorize
 * @returns {Promise<string>} - The category of the content
 */
const categorizeContent = async (content) => {
  try {
    // Skip categorization if no API key is provided
    if (!config.GEMINI_API_KEY) {
      console.warn('No Gemini API key provided. Skipping categorization.');
      return 'Uncategorized';
    }

    // Skip categorization for very large content to avoid API limits
    if (content.length > 10000) {
      console.warn('Content too large for categorization. Truncating...');
      content = content.substring(0, 10000) + '...';
    }

    // Get the model
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Prepare the prompt for categorization
    const prompt = `
    Analyze the following text and categorize it into exactly ONE of these categories:
    - Code Snippet (any programming code or configuration)
    - URL (web addresses, links)
    - Email Address (email addresses)
    - Phone Number (phone numbers in any format)
    - Physical Address (postal addresses, locations)
    - Quote (longer blocks of prose, paragraphs, or quotes)
    - Plain Text (short text that doesn't fit other categories)

    Respond with ONLY the category name, nothing else.

    Text to categorize:
    ${content}
    `;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Validate the response is one of our expected categories
    const validCategories = [
      'Code Snippet',
      'URL',
      'Email Address',
      'Phone Number',
      'Physical Address',
      'Quote',
      'Plain Text'
    ];

    if (validCategories.includes(text)) {
      return text;
    } else {
      console.warn(`Unexpected category from AI: ${text}. Using 'Plain Text' instead.`);
      return 'Plain Text';
    }
  } catch (error) {
    console.error('Error categorizing content with Gemini AI:', error);
    return 'Uncategorized';
  }
};

module.exports = {
  categorizeContent
};
