// Check if script is already injected
if (!window.clipContextCopyDetectorInjected) {
  window.clipContextCopyDetectorInjected = true;

  console.log('ClipContext copy detector injected');

  // Listen for copy events
  document.addEventListener('copy', (event) => {
    console.log('Copy event detected');
    
    // Notify background script
    chrome.runtime.sendMessage({
      action: 'copyDetected'
    });
  });

  // Listen for context menu "Copy image" events
  document.addEventListener('contextmenu', (event) => {
    // Store the target element
    window.clipContextContextMenuTarget = event.target;
  });

  // Create a MutationObserver to detect when context menu is opened
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        // Check if any added node is a context menu
        for (const node of mutation.addedNodes) {
          if (node.nodeName === 'CONTEXT-MENU' || 
              (node.classList && (
                node.classList.contains('context-menu') || 
                node.classList.contains('contextmenu')
              ))) {
            // Add click listener to the document to detect context menu item clicks
            document.addEventListener('click', handleContextMenuClick, { once: true });
            break;
          }
        }
      }
    }
  });

  // Start observing the document body
  observer.observe(document.body, { childList: true, subtree: true });

  // Handle context menu clicks
  function handleContextMenuClick(event) {
    // Check if the clicked element is a "Copy image" menu item
    const target = event.target;
    if (target && 
        (target.textContent.includes('Copy image') || 
         target.textContent.includes('Copy Image'))) {
      
      // If we have a context menu target and it's an image
      if (window.clipContextContextMenuTarget && 
          window.clipContextContextMenuTarget.nodeName === 'IMG') {
        
        // Wait a short time for the copy to complete
        setTimeout(() => {
          console.log('Image copy detected via context menu');
          chrome.runtime.sendMessage({
            action: 'copyDetected'
          });
        }, 100);
      }
    }
  }
}
