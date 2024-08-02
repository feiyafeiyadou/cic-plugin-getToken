const messageStrategy = (data) => {
  return {
    "set-mobile-localStroage": () => {
      localStorage.setItem("token", data.token);
    },
    "set-pc-localStroage": () => {},
  };
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { type, data, response } = request ?? {};

  messageStrategy(data)[type]();

  sendResponse(response ?? true);
});
