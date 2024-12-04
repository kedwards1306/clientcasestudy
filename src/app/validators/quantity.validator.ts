import { AbstractControl } from "@angular/forms";
export function QuantityValidator(control: AbstractControl):
 { invalidPostalCode: boolean } | null {
    const QUANTITYVALIDATOR_REGEXP = /^\d+$/;
    return !QUANTITYVALIDATOR_REGEXP.test(control.value) ? { invalidPostalCode: true } : null;

}