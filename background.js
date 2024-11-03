const URL = "";
const TOKEN = "";

function updateBinarySensorState(sensor_name, friendly_name, state) {
    fetch(`${URL}/api/states/binary_sensor.${sensor_name}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${TOKEN}`,
            "content-type": "application/json",
        },
        body: JSON.stringify({ "state": state ? "on" : "off", "attributes": { "friendly_name": friendly_name } })
    }).then(response => {
        if (!response.ok) {
            console.error("Received incorrect response from homeassistant api")
        }
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.get('periodic', a => {
        if (!a) chrome.alarms.create('periodic', { periodInMinutes: 0.1 });
    });
});

chrome.alarms.onAlarm.addListener(() => {
    chrome.tabs.query({ url: "*://trandelion.com/*" }, async (tabs) => {
        let running = false;
        for (const tab of tabs) {
            const response = await chrome.tabs.sendMessage(tab.id, { action: "periodic" })
            if (response?.button_state) {
                running = response.button_state;
            }
        };
        updateBinarySensorState("trandelion", "Trandelion", running);
    });
});
