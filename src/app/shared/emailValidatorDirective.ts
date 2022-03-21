import { Directive } from "@angular/core";
import { ValidatorFn, AbstractControl, ValidationErrors, NG_VALIDATORS, Validator } from "@angular/forms";

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let emailRegexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    const wrongEmail = !emailRegexp.test(control.value);
    return wrongEmail ? {wrongEmail: {value: control.value}} : null;
  };
}

@Directive({
    selector: '[emailValidatorDirective]',
    providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
  })
  export class EmailValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
      return emailValidator()(control);  
    }
  }