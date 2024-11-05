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
    initial: Disabled
    icon: mdi:translate
```