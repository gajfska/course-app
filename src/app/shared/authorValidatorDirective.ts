import { Directive } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
  Validator,
} from '@angular/forms';

export function authorValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let emailRegexp = new RegExp('^[A-Za-z0-9]*$');

    const wrongEmail = !emailRegexp.test(control.value);
    return wrongEmail ? { wrongEmail: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[authorValidatorDirective]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: AuthorValidatorDirective,
      multi: true,
    },
  ],
})
export class AuthorValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return authorValidator()(control);
  }
}
