document.addEventListener('DOMContentLoaded', async () => {
  const toggleButton = document.getElementById('toggleFeature');

  const featureEnabled = await getFeatureState();
  updateButtonUI(featureEnabled);

  toggleButton.addEventListener('click', async () => {
    const newState = !(await getFeatureState());
    await setFeatureState(newState);
    updateButtonUI(newState);
    sendFeatureToggleMessage(newState);
  });
});

function updateButtonUI(state) {
  const toggleButton = document.getElementById('toggleFeature');
  toggleButton.textContent = state ? 'Disable Feature' : 'Enable Feature';
}

function getFeatureState() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['featureEnabled'], (result) => {
      resolve(result.featureEnabled || false);
    });
  });
}

function setFeatureState(state) {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ featureEnabled: state }, () => {
      console.log(`Feature state saved: ${state}`);
      resolve();
    });
  });
}

function sendFeatureToggleMessage(state) {
  const port = chrome.runtime.connect({ name: 'feature-toggle' });
  port.postMessage({ action: state ? 'ENABLE_FEATURE' : 'DISABLE_FEATURE' });
}
