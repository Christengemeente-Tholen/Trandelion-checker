This is a small browser plugin to get the current state of Trandelion within home assistant, things like if it is currently running and the url to the translation. And home assistant can enable/disable the translation when Trandelion is running.

For the best experience, load the extension from folder within chrome. This will make chrome update the state way faster than using the extension available in the [chrome web store](https://chromewebstore.google.com/detail/trandelion-checker/jjehpfcmdefohbdcnepemchpcjhjeicd).

[Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/trandelion-checker/)

You can setup the extension by clicking on it's icon.

![image](https://github.com/user-attachments/assets/906692c3-e266-499c-a4bc-ebf293ecec85)

Add the following to home assistant's configuration.yaml file:
```yaml
# switch to show and change state
switch:
  - platform: template
    switches:
      trandelion:
        friendly_name: Trandelion
        value_template: "{{ is_state('input_select.trandelion', 'Enabled') }}"
        turn_on:
          action: input_select.select_option
          target:
            entity_id: input_select.trandelion
          data:
            option: "Enable"
        turn_off:
          action: input_select.select_option
          target:
            entity_id: input_select.trandelion
          data:
            option: "Disable"

# Helper for more states
input_select:
  trandelion:
    name: Trandelion
    options:
      - Enable
      - Disable
      - Disabled
      - Enabled
      - Unavailable
    initial: Unavailable
    icon: mdi:translate
```

If everything is setup correctly, it should show both a helper for the state. And a switch to change the state from within home assistant.
![image](https://github.com/user-attachments/assets/ba98f871-f0d8-4658-8de4-5bc93e047e66)
![image](https://github.com/user-attachments/assets/68fdc6dc-8aeb-40db-98fb-db909d2c346c)
