// Listen for messages from the service worker
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.target !== 'offscreen') return;

  // Handle different actions
  if (message.action === 'getClipboardContent') {
    try {
      const clipboardContent = await readClipboard();
      sendResponse(clipboardContent);
    } catch (error) {
      console.error('Error reading clipboard:', error);
      sendResponse({ success: false, error: error.message });
    }
  }
  
  return true;
});

/**
 * Reads content from the clipboard
 * @returns {Promise<Object>} Clipboard content and type
 */
async function readClipboard() {
  try {
    // Try to read text content first
    const text = await navigator.clipboard.readText();
    if (text) {
      return {
        success: true,
        content: text,
        contentType: 'text'
      };
    }
  } catch (error) {
    console.log('No text content in clipboard, trying image...');
  }

  try {
    // Try to read image content
    const items = await navigator.clipboard.read();
    for (const item of items) {
      // Check for image types
      if (item.types.some(type => type.startsWith('image/'))) {
        const imageType = item.types.find(type => type.startsWith('image/'));
        const blob = await item.getType(imageType);
        
        // Convert blob to base64
        const base64 = await blobToBase64(blob);
        
        return {
          success: true,
          content: base64,
          contentType: 'image'
        };
      }
    }
  } catch (error) {
    console.error('Error reading clipboard image:', error);
  }

  return { success: false, error: 'No supported content found in clipboard' };
}

/**
 * Converts a Blob to base64 string
 * @param {Blob} blob - The blob to convert
 * @returns {Promise<string>} Base64 string
 */
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
