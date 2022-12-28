import { ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';

export class RegisterValidators {
  static match(controlName: string, matchingControlName: string) : ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get('password');
      const matchingControl = group.get('confirm_password');

      if (!control || !matchingControl) {
        console.error('Form Controls can  not be found in the form group.');

        return { ControlNotFound: false };
      }

      const error =
        control.value === matchingControl.value ? null : { noMatch: true };
        matchingControl.setErrors(error)
      return error;
    };
  }
}
