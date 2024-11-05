const URL = "https://homeassistant.jobse.space";
const TOKEN = "";

async function getSensorState(sensor_name) {
    const response = await fetch(`${URL}/api/states/input_select.${sensor_name}`, {
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "content-type": "application/json",
        },
    });
    const result = await response.json();
    return result?.state;
}

async function updateSensorState(sensor_name, friendly_name, state) {
    const response = await fetch(`${URL}/api/states/input_select.${sensor_name}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "content-type": "application/json",
        },
        body: JSON.stringify({
            "state": state ? "Enabled" : "Disabled",
            "attributes": {
                "friendly_name": friendly_name,
                "options": [
                    "Enable",
                    "Disable",
                    "Disabled",
                    "Enabled"
                ],
                "editable": false,
                "icon": "mdi:translate",
            },

        })
    });
    if (!response.ok) {
        console.error("Received incorrect response from homeassistant api");
    }
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.get('periodic', a => {
        if (!a) chrome.alarms.create('periodic', { periodInMinutes: 0.1 });
    });
});

chrome.alarms.onAlarm.addListener(() => {
    chrome.tabs.query({ url: "*://trandelion.com/*" }, async (tabs) => {
        let running = false;
        let currentTab = undefined;
        for (const tab of tabs) {
            const response = await chrome.tabs.sendMessage(tab.id, { action: "check" })
            if (![null, undefined].includes(response?.button_state)) {
                running = response.button_state;
                currentTab = tab.id;
            }
        };
        const state = await getSensorState("trandelion");
        // Use a in-between Enable/Disable state from home assistant to not block state change from the browser
        if (currentTab !== undefined) {
            if (running && state == "Disable") {
                await chrome.tabs.sendMessage(currentTab, { action: state });
            } else if (!running && state == "Enable") {
                await chrome.tabs.sendMessage(currentTab, { action: state });
            }
        }

        await updateSensorState("trandelion", "Trandelion", running);
    });
});
