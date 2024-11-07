const urlElm = document.getElementById("url");
const tokenElm = document.getElementById("token");
const tokenHelpElm = document.getElementById("tokenHelp");
const messageElm = document.getElementById("message");

function setTokenHelpElm(url) {
    const res = url + "/profile/security";
    tokenHelpElm.innerText = res;
    tokenHelpElm.href = res;
}

chrome.storage.local.get(["url", "token"], function (items) {
    urlElm.value = items?.url || "";
    tokenElm.value = items?.token || "";
    setTokenHelpElm(items?.url || "https://example.com");
});

async function checkPermissions(requiredPermissions) {
    const hasPermissions = await chrome.permissions.contains(requiredPermissions);
    if (!hasPermissions) {
        console.debug("Missing permissions");
        await chrome.permissions.request(requiredPermissions);
    }
}

urlElm.onkeyup = (e) => {
    setTokenHelpElm(e.target.value);
};

async function checkValues(url) {
    const response = await fetch(`${url?.origin}/api/`, {
        headers: {
            "Authorization": `Bearer ${tokenElm.value}`,
            "content-type": "application/json",
        },
    });
    const result = await response.json();
    if (result?.message === "API running.") {
        messageElm.className = "text-success"
        messageElm.innerText = "Test successful!";
    } else {

        messageElm.className = "text-danger"
        messageElm.innerText = "Api didn't return the correct response!";
    }
}

async function saveValues(url) {
    await chrome.storage.local.set({ url: url.origin, token: tokenElm.value });
    messageElm.className = "text-success"
    messageElm.innerText = "Changes saved successfully."
}

document.getElementById("homeAssistantConn").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const url = new URL(urlElm.value);
        // always needs the permissions, even to just check if the api connection works...
        await checkPermissions({ origins: [url.origin + "/*"] });
        if (e?.submitter?.name == "test") {
            await checkValues(url);
        } else {
            await saveValues(url);
        }
    } catch (e) {
        messageElm.className = "text-danger"
        messageElm.innerText = "Setup failed with error: " + e;
    }
});