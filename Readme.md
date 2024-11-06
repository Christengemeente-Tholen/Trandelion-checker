This is a small browser plugin to get the current state of Trandelion within home assistant, things like if it is currently running and the url to the translation. And home assistant can enable/disable the translation when Trandelion is running.

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
