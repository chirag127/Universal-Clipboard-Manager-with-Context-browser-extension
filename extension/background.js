// Constants
const API_BASE_URL = 'http://localhost:3000/api/v1';
const OFFSCREEN_DOCUMENT_PATH = 'offscreen.html';
const ALARM_NAME = 'cleanup-alarm';

// Initialize extension on install
chrome.runtime.onInstalled.addListener(async () => {
  console.log('ClipContext extension installed');
  
  // Generate and store a unique user ID if not already present
  const { userId } = await chrome.storage.local.get('userId');
  if (!userId) {
    const newUserId = crypto.randomUUID();
    await chrome.storage.local.set({ userId: newUserId });
    console.log('Generated new user ID:', newUserId);
  }
  
  // Initialize settings with defaults if not already present
  const { settings } = await chrome.storage.local.get('settings');
  if (!settings) {
    const defaultSettings = {
      enabled: true,
      aiCategorization: true,
      maxItems: 500,
      maxDays: 30
    };
    await chrome.storage.local.set({ settings: defaultSettings });
    console.log('Initialized default settings');
  }
  
  // Set up alarm for periodic cleanup
  chrome.alarms.create(ALARM_NAME, { periodInMinutes: 60 });
});

// Handle copy events via content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'copyDetected') {
    handleCopyEvent(sender.tab);
    sendResponse({ status: 'processing' });
  }
  return true;
});

// Handle alarm for periodic cleanup
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    performCleanup();
  }
});

/**
 * Creates or gets an offscreen document for clipboard access
 */
async function setupOffscreenDocument() {
  // Check if offscreen document is already open
  if (await hasOffscreenDocument()) {
    return;
  }

  // Create an offscreen document
  await chrome.offscreen.createDocument({
    url: OFFSCREEN_DOCUMENT_PATH,
    reasons: ['CLIPBOARD'],
    justification: 'Read clipboard data'
  });
}

/**
 * Checks if offscreen document exists
 */
async function hasOffscreenDocument() {
  try {
    const existingContexts = await chrome.offscreen.getContexts();
    return existingContexts.some(c => c.documentUrl.includes(OFFSCREEN_DOCUMENT_PATH));
  } catch (e) {
    return false;
  }
}

/**
 * Closes the offscreen document
 */
async function closeOffscreenDocument() {
  if (await hasOffscreenDocument()) {
    await chrome.offscreen.closeDocument();
  }
}

/**
 * Handles a copy event by reading clipboard and sending to backend
 */
async function handleCopyEvent(tab) {
  try {
    // Check if clipboard monitoring is enabled
    const { settings } = await chrome.storage.local.get('settings');
    if (!settings || !settings.enabled) {
      console.log('Clipboard monitoring is disabled');
      return;
    }

    // Get the active tab information
    if (!tab) {
      const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
      tab = activeTab;
    }

    if (!tab) {
      console.error('No active tab found');
      return;
    }

    // Set up offscreen document for clipboard access
    await setupOffscreenDocument();

    // Request clipboard content from offscreen document
    const response = await chrome.runtime.sendMessage({
      target: 'offscreen',
      action: 'getClipboardContent'
    });

    // Close offscreen document after use
    await closeOffscreenDocument();

    if (!response || !response.success) {
      console.error('Failed to get clipboard content:', response?.error);
      return;
    }

    // Prepare item data
    const clipboardData = {
      content: response.content,
      contentType: response.contentType,
      sourceUrl: tab.url,
      sourceTitle: tab.title || tab.url
    };

    // Send to backend
    await saveClipboardItem(clipboardData);
  } catch (error) {
    console.error('Error handling copy event:', error);
  }
}

/**
 * Saves clipboard item to backend
 */
async function saveClipboardItem(clipboardData) {
  try {
    const { userId } = await chrome.storage.local.get('userId');
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    const response = await fetch(`${API_BASE_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId
      },
      body: JSON.stringify(clipboardData)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Clipboard item saved:', data);
  } catch (error) {
    console.error('Error saving clipboard item:', error);
  }
}

/**
 * Performs cleanup based on user settings
 */
async function performCleanup() {
  try {
    const { userId, settings } = await chrome.storage.local.get(['userId', 'settings']);
    if (!userId) {
      console.error('User ID not found');
      return;
    }

    if (!settings) {
      console.error('Settings not found');
      return;
    }

    // Send retention settings to backend
    const response = await fetch(`${API_BASE_URL}/items/settings/retention`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId
      },
      body: JSON.stringify({
        maxItems: settings.maxItems,
        maxDays: settings.maxDays
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Cleanup performed:', data);
  } catch (error) {
    console.error('Error performing cleanup:', error);
  }
}

// Set up content script injection for copy detection
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    // Check if clipboard monitoring is enabled
    const { settings } = await chrome.storage.local.get('settings');
    if (!settings || !settings.enabled) {
      return;
    }

    // Inject content script to detect copy events
    await chrome.scripting.executeScript({
      target: { tabId: activeInfo.tabId },
      files: ['utils/copyDetector.js']
    });
  } catch (error) {
    console.error('Error injecting content script:', error);
  }
});
