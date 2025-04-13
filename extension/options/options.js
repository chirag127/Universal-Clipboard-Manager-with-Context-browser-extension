// Constants
const API_BASE_URL = 'http://localhost:3000/api/v1';

// DOM Elements
const elements = {
  // Settings toggles
  enableMonitoring: document.getElementById('enableMonitoring'),
  enableAI: document.getElementById('enableAI'),
  
  // Data retention
  maxItems: document.getElementById('maxItems'),
  maxDays: document.getElementById('maxDays'),
  
  // Data management
  clearHistoryBtn: document.getElementById('clearHistoryBtn'),
  exportDataBtn: document.getElementById('exportDataBtn'),
  importFile: document.getElementById('importFile'),
  
  // User ID
  userId: document.getElementById('userId'),
  copyUserIdBtn: document.getElementById('copyUserIdBtn'),
  
  // Privacy policy
  privacyPolicyLink: document.getElementById('privacyPolicyLink'),
  
  // Save button
  saveSettingsBtn: document.getElementById('saveSettingsBtn'),
  
  // Clear history modal
  clearHistoryModal: document.getElementById('clearHistoryModal'),
  closeClearHistoryModalBtn: document.getElementById('closeClearHistoryModalBtn'),
  cancelClearHistoryBtn: document.getElementById('cancelClearHistoryBtn'),
  confirmClearHistoryBtn: document.getElementById('confirmClearHistoryBtn'),
  keepFavorites: document.getElementById('keepFavorites'),
  
  // Privacy policy modal
  privacyPolicyModal: document.getElementById('privacyPolicyModal'),
  closePrivacyPolicyModalBtn: document.getElementById('closePrivacyPolicyModalBtn'),
  closePrivacyPolicyBtn: document.getElementById('closePrivacyPolicyBtn'),
  
  // Toast
  toast: document.getElementById('toast')
};

// Initialize options page
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  setupEventListeners();
});

// Load settings from storage
async function loadSettings() {
  try {
    const { userId, settings } = await chrome.storage.local.get(['userId', 'settings']);
    
    // Display user ID
    if (userId) {
      elements.userId.value = userId;
    }
    
    // Load settings if available
    if (settings) {
      elements.enableMonitoring.checked = settings.enabled !== false;
      elements.enableAI.checked = settings.aiCategorization !== false;
      
      // Set max items
      if (settings.maxItems) {
        elements.maxItems.value = settings.maxItems.toString();
      }
      
      // Set max days
      if (settings.maxDays) {
        elements.maxDays.value = settings.maxDays.toString();
      }
    }
  } catch (error) {
    console.error('Error loading settings:', error);
    showToast('Error loading settings', 'error');
  }
}

// Setup event listeners
function setupEventListeners() {
  // Save settings button
  elements.saveSettingsBtn.addEventListener('click', saveSettings);
  
  // Clear history button
  elements.clearHistoryBtn.addEventListener('click', () => {
    elements.clearHistoryModal.classList.remove('hidden');
  });
  
  // Export data button
  elements.exportDataBtn.addEventListener('click', exportData);
  
  // Import file input
  elements.importFile.addEventListener('change', importData);
  
  // Copy user ID button
  elements.copyUserIdBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(elements.userId.value)
      .then(() => showToast('User ID copied to clipboard'))
      .catch(error => {
        console.error('Error copying user ID:', error);
        showToast('Error copying user ID', 'error');
      });
  });
  
  // Privacy policy link
  elements.privacyPolicyLink.addEventListener('click', (e) => {
    e.preventDefault();
    elements.privacyPolicyModal.classList.remove('hidden');
  });
  
  // Clear history modal
  elements.closeClearHistoryModalBtn.addEventListener('click', () => {
    elements.clearHistoryModal.classList.add('hidden');
  });
  
  elements.cancelClearHistoryBtn.addEventListener('click', () => {
    elements.clearHistoryModal.classList.add('hidden');
  });
  
  elements.confirmClearHistoryBtn.addEventListener('click', clearHistory);
  
  // Privacy policy modal
  elements.closePrivacyPolicyModalBtn.addEventListener('click', () => {
    elements.privacyPolicyModal.classList.add('hidden');
  });
  
  elements.closePrivacyPolicyBtn.addEventListener('click', () => {
    elements.privacyPolicyModal.classList.add('hidden');
  });
  
  // Close modals when clicking outside
  window.addEventListener('click', (event) => {
    if (event.target === elements.clearHistoryModal) {
      elements.clearHistoryModal.classList.add('hidden');
    }
    if (event.target === elements.privacyPolicyModal) {
      elements.privacyPolicyModal.classList.add('hidden');
    }
  });
}

// Save settings
async function saveSettings() {
  try {
    const settings = {
      enabled: elements.enableMonitoring.checked,
      aiCategorization: elements.enableAI.checked,
      maxItems: parseInt(elements.maxItems.value),
      maxDays: parseInt(elements.maxDays.value)
    };
    
    await chrome.storage.local.set({ settings });
    
    // Update retention settings on backend
    await updateRetentionSettings(settings);
    
    showToast('Settings saved successfully');
  } catch (error) {
    console.error('Error saving settings:', error);
    showToast('Error saving settings', 'error');
  }
}

// Update retention settings on backend
async function updateRetentionSettings(settings) {
  try {
    const { userId } = await chrome.storage.local.get('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }
    
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
    console.log('Retention settings updated:', data);
  } catch (error) {
    console.error('Error updating retention settings:', error);
    // Don't show toast here, as we already show one for saving settings
  }
}

// Clear history
async function clearHistory() {
  try {
    const { userId } = await chrome.storage.local.get('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }
    
    const keepFavorites = elements.keepFavorites.checked;
    
    // Build query parameters
    const params = new URLSearchParams();
    if (keepFavorites) {
      params.append('keepFavorites', 'true');
    }
    
    // Delete items via API
    const response = await fetch(`${API_BASE_URL}/items?${params.toString()}`, {
      method: 'DELETE',
      headers: {
        'X-User-Id': userId
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('History cleared:', data);
    
    // Close modal
    elements.clearHistoryModal.classList.add('hidden');
    
    // Show success message
    showToast(`${data.deletedCount} items deleted successfully`);
  } catch (error) {
    console.error('Error clearing history:', error);
    showToast('Error clearing history', 'error');
    
    // Close modal
    elements.clearHistoryModal.classList.add('hidden');
  }
}

// Export data
async function exportData() {
  try {
    const { userId } = await chrome.storage.local.get('userId');
    if (!userId) {
      throw new Error('User ID not found');
    }
    
    // Fetch all items from API
    const response = await fetch(`${API_BASE_URL}/items?limit=1000`, {
      headers: {
        'X-User-Id': userId
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Create export object
    const exportData = {
      userId,
      exportDate: new Date().toISOString(),
      items: data.items
    };
    
    // Convert to JSON string
    const jsonString = JSON.stringify(exportData, null, 2);
    
    // Create download link
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clipcontext-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
    
    showToast('Data exported successfully');
  } catch (error) {
    console.error('Error exporting data:', error);
    showToast('Error exporting data', 'error');
  }
}

// Import data
async function importData(event) {
  try {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    
    // Read file
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const { userId } = await chrome.storage.local.get('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }
        
        // Parse JSON
        const importData = JSON.parse(e.target.result);
        
        // Validate import data
        if (!importData.items || !Array.isArray(importData.items)) {
          throw new Error('Invalid import file format');
        }
        
        // Import items one by one
        let successCount = 0;
        let errorCount = 0;
        
        for (const item of importData.items) {
          try {
            // Prepare item data
            const itemData = {
              content: item.content,
              contentType: item.contentType,
              sourceUrl: item.sourceUrl,
              sourceTitle: item.sourceTitle
            };
            
            // Send to API
            const response = await fetch(`${API_BASE_URL}/items`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-User-Id': userId
              },
              body: JSON.stringify(itemData)
            });
            
            if (response.ok) {
              successCount++;
            } else {
              errorCount++;
            }
          } catch (error) {
            console.error('Error importing item:', error);
            errorCount++;
          }
        }
        
        // Reset file input
        event.target.value = '';
        
        // Show result
        showToast(`Import complete: ${successCount} items imported, ${errorCount} errors`);
      } catch (error) {
        console.error('Error processing import file:', error);
        showToast('Error processing import file', 'error');
        
        // Reset file input
        event.target.value = '';
      }
    };
    
    reader.onerror = () => {
      console.error('Error reading file');
      showToast('Error reading file', 'error');
      
      // Reset file input
      event.target.value = '';
    };
    
    reader.readAsText(file);
  } catch (error) {
    console.error('Error importing data:', error);
    showToast('Error importing data', 'error');
    
    // Reset file input
    event.target.files = null;
  }
}

// Show toast notification
function showToast(message, type = 'success') {
  const toast = elements.toast;
  toast.textContent = message;
  toast.className = `toast ${type}`;
  
  // Remove hidden class
  toast.classList.remove('hidden');
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}
