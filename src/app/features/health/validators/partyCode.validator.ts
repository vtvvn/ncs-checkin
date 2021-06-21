import { AbstractControl, ValidatorFn } from '@angular/forms';

export function parytCodeValidator(type: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    type === 'EMP' ? { required: true } : null;
}
