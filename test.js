const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Test backend server
console.log('Testing backend server...');
exec('curl http://localhost:3000/health', (error, stdout, stderr) => {
  if (error) {
    console.error('Error testing backend server:', error);
    console.log('Make sure the backend server is running with: npm run dev');
    return;
  }
  
  console.log('Backend server is running:', stdout);
  
  // Test extension files
  console.log('\nChecking extension files...');
  const requiredFiles = [
    'extension/manifest.json',
    'extension/background.js',
    'extension/offscreen.html',
    'extension/offscreen.js',
    'extension/popup/popup.html',
    'extension/popup/popup.js',
    'extension/popup/popup.css',
    'extension/options/options.html',
    'extension/options/options.js',
    'extension/options/options.css',
    'extension/utils/copyDetector.js',
    'extension/assets/icons/icon16.svg',
    'extension/assets/icons/icon48.svg',
    'extension/assets/icons/icon128.svg',
    'extension/assets/icons/globe.svg',
    'backend/server.js',
    'backend/config/config.js',
    'backend/config/db.js',
    'backend/models/ClipboardItem.js',
    'backend/routes/api/v1/items.js',
    'backend/controllers/itemController.js',
    'backend/services/aiService.js',
    'backend/services/cleanupService.js',
    'backend/middleware/auth.js',
    'backend/middleware/errorHandler.js',
    'backend/middleware/rateLimiter.js'
  ];
  
  let allFilesExist = true;
  
  for (const file of requiredFiles) {
    if (fs.existsSync(path.join(__dirname, file))) {
      console.log(`✓ ${file}`);
    } else {
      console.error(`✗ ${file} - MISSING`);
      allFilesExist = false;
    }
  }
  
  if (allFilesExist) {
    console.log('\nAll required files exist!');
    console.log('\nTo use the extension:');
    console.log('1. Start the backend server: npm run dev');
    console.log('2. Load the extension in Chrome:');
    console.log('   - Go to chrome://extensions/');
    console.log('   - Enable Developer Mode');
    console.log('   - Click "Load unpacked" and select the "extension" folder');
    console.log('3. Copy text in your browser to see it in the extension popup');
  } else {
    console.error('\nSome required files are missing. Please check the errors above.');
  }
});
