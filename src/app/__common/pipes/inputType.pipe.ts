import { Pipe, PipeTransform } from '@angular/core';
import { InputTypesRegistry } from '../classes/inputTypes.class';

@Pipe({ name: 'inputType' })
export class InputTypePipe implements PipeTransform {
  transform(value: number): string {
    const types = InputTypesRegistry.availableTypes();

    const type = types.find(element => {
      return element.value === value;
    });

    return type ? type.name : 'Unspecified';
  }
}
