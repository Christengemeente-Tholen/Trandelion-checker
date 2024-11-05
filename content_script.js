chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const start_button = document.querySelector('[title="start translation"]');
    const stop_button = document.querySelector('[title="stop translation"]');
    switch (request.action) {
        case "Disable":
            stop_button.click();
            break;

        case "Enable":
            start_button.click();
            break;

        default:
            sendResponse({ button_state: start_button?.disabled || false });
            break;
    };
});