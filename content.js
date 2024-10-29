document.addEventListener('mouseup', async () => {
    const selectedText = window.getSelection().toString().trim();
  
    if (selectedText && (await getFeatureState())) {
      const sanitizedText = removeWhitespace(selectedText);
      console.log('Sanitized Text:', sanitizedText);
      sendSelectedText(sanitizedText);
    }
  });
  
  function removeWhitespace(text) {
    return text.replace(/\s+/g, '');
  }
  
  function getFeatureState() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['featureEnabled'], (result) => {
        resolve(result.featureEnabled || false);
      });
    });
  }
  
  function sendSelectedText(text) {
    const port = chrome.runtime.connect({ name: 'feature-toggle' });
    port.postMessage({ action: 'TEXT_SELECTED', text });
  }
  