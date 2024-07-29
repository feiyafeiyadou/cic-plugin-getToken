chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  localStorage.setItem("token", request.token);
  sendResponse(true);
});
