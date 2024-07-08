import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const startDate = control.get('datedebut')?.value;
    const endDate = control.get('datefin')?.value;

    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { 'dateInvalid': true };
    }
    return null;
  };
}
