chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let start_button = document.querySelector('[title="start translation"]');
    const stop_button = document.querySelector('[title="stop translation"]');
    const qr_code = document.querySelector("#qrcode[src]")?.src; // multiple qr-code id's available, but only 1 contains source.
    const direct_link = document.querySelector("#readLink[data-bind]")?.href;
    let button_state = start_button?.disabled;
    // if both are disabled, trandelion is still loading
    if (start_button?.disabled && stop_button?.disabled) {
        button_state = false
    }
    switch (request.action) {
        case "Disable":
            stop_button.click();
            break;

        case "Enable":
            start_button.click();
            break;

        default:
            // style is none means that trandelion isn't ready to receive audio.
            sendResponse({ button_state: button_state || false, qr_code, direct_link, ready: start_button.style.display !== "none" });
            break;
    };
});