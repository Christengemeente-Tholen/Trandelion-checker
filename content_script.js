chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const start_button = document.getElementById("startbutton");
    sendResponse({ button_state: start_button?.disabled || false })
});