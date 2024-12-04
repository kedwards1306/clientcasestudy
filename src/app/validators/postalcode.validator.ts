import { AbstractControl } from '@angular/forms';

export function ValidatePostalCode(control: AbstractControl): { invalidPostalCode: boolean } | null {
  const PostalCode_REGEXP = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  return !PostalCode_REGEXP.test(control.value) ? { invalidPostalCode: true } : null;
}
