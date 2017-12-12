export class InputTypesRegistry {
  public static availableTypes() {
    return [
      {
        name: 'Text input',
        type: 'input_text',
        value: 0
      },
      {
        name: 'Number input',
        type: 'input_number',
        value: 1
      },
      {
        name: 'Radio list',
        type: 'radio_list',
        value: 2
      },
      {
        name: 'Checkbox list',
        type: 'checkbox_list',
        value: 3
      },
      {
        name: 'Select drop-down',
        type: 'select',
        value: 4
      }
    ];
  }
}
