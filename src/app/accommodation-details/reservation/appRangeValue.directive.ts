import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appRangeValidator][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RangeValidatorDirective,
      multi: true,
    },
  ],
})
export class RangeValidatorDirective implements Validator {
  @Input('range') range: { min: number, max: number };

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const min = this.range.min;
    const max = this.range.max;

    if (value !== null && (isNaN(value) || value < min || value > max)) {
      return { rangeError: true };
    }

    return null;
  }
}
