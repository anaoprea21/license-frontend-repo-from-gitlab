import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/core/api/auth.service';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { NotifText } from 'src/app/shared/enums/notif.text';

@Component({
  selector: 'app-two-factor-code',
  templateUrl: './two-factor-code.component.html',
  styleUrls: ['./two-factor-code.component.scss'],
})
export class TwoFactorCodeComponent implements OnInit {
  enteredCode: { value: string }[] = [
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
  ];
  isCodeValid: boolean = true;
  isVerifyingCode: boolean = false;

  constructor(
    private notification: NzNotificationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  updateValue(value: string, index: number): void {
    this.isCodeValid = true;

    const reg = /[0-9]*$/;
    if (
      ((!isNaN(+value) && reg.test(value)) || value === '') &&
      value.length <= 1
    ) {
      this.enteredCode[index].value = value;
    }
    (document.getElementById(`element-${index}`) as HTMLInputElement).value =
      this.enteredCode[index].value;

    if (
      value.length === 1 &&
      this.enteredCode[index].value.length > 0 &&
      index < this.enteredCode.length
    )
      (
        document.getElementById(`element-${index + 1}`) as HTMLInputElement
      ).focus();
  }

  focus() {
    this.isCodeValid = true;
  }

  deleteCharacter(index: number) {
    (
      document.getElementById(`element-${index - 1}`) as HTMLInputElement
    ).focus();
  }

  login() {
    this.isVerifyingCode = true;
    let code: string = '';

    this.enteredCode.forEach((element) => {
      code += element.value;
    });

    this.authService.verify2FACode({ code: code, email: '' }).subscribe({
      next: (res) => {
        StorageHelper.saveAccessTokenLocal(res.response.accessToken);
        StorageHelper.saveRefreshTokenLocal(res.response.refreshToken);
        this.isCodeValid = true;
        this.isVerifyingCode = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        const message =
        Object.entries(NotifText).find(([key, val]) => {
          key === err.error.messsage;
          return val;
        })?.[1] ?? err.error.message;
      this.notification.create('error', 'Error', message);
        this.isCodeValid = false;
        this.isVerifyingCode = false;
      },
    });
  }
}
