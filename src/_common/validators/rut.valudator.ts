import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { validate } from 'rut.js';

@ValidatorConstraint({ name: 'customText', async: false })
export class RutValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return validate(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Rut incorrecto';
  }
}
