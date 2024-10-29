let featureEnabled = false;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'feature-toggle') {
    port.onMessage.addListener((message) => {
      switch (message.action) {
        case 'ENABLE_FEATURE':
          featureEnabled = true;
          console.log('Feature enabled');
          break;
        case 'DISABLE_FEATURE':
          featureEnabled = false;
          console.log('Feature disabled');
          break;
      }
    });
  }
});
