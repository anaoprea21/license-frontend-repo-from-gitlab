import { FormGroup } from '@angular/forms';

export class CustomValidator {
  public static emailValidator(control: FormGroup) {
    const emailRegexp: RegExp = new RegExp(
      "^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}$"
    );
    if (!emailRegexp.test(control.value?.trim()) && control.value) {
      return { emailValid: true };
    }

    return null;
  }
}
