chrome.runtime.sendMessage({
  'from': 'offscreen',
  'target': 'background',
  'data': JSON.stringify(window.localStorage)
});