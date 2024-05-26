import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/core/api/auth.service';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { CustomValidator } from 'src/app/core/helpers/validators.helper';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { CreateNewUserPayload } from 'src/app/shared/interfaces/payloads/CreateNewUserPayload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  validateInputs: FormGroup;
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;

  isRegistering: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private authService: AuthService
  ) {
    this.validateInputs = this.formBuilder.group({
      userEmail: [null, [Validators.required, CustomValidator.emailValidator]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  verifyData() {
    this.isRegistering = true;
    if (this.password?.value === this.confirmPassword?.value) {
      if (
        this.userEmail?.valid &&
        this.password?.valid &&
        this.username?.valid
      ) {
        this.authService
          .createNewUser({
            role: 'User',
            email: this.userEmail?.value,
            username: this.username?.value,
            password: this.password?.value,
          })
          .subscribe({
            next: (res) => {
              this.isRegistering = false;
              this.notification.create(
                'success',
                'Success',
                'Registered successfully!'
              );
              StorageHelper.saveAccessTokenLocal(res.response.accessToken);
              StorageHelper.saveRefreshTokenLocal(res.response.refreshToken);
              this.router.navigate(['/auth/login']);
            },
            error: (err) => {
              const message =
                Object.entries(NotifText).find(([key, val]) => {
                  key === err.error.messsage;
                  return val;
                })?.[1] ?? err.error.message;
              this.notification.create('error', 'Error', message);
              this.isRegistering = false;
            },
          });
      } else {
        this.notification.create(
          'error',
          'Error',
          'Ups! Something went wrong... 😢'
        );
        this.userEmail?.markAsDirty();
        this.username?.markAsDirty();
        this.password?.markAsDirty();
        this.confirmPassword?.markAsDirty();
        this.isRegistering = false;
      }
    } else {
      this.notification.create(
        'error',
        'Error',
        "Ups! The passwords don't coincide... 😢"
      );
      this.isRegistering = false;
    }
  }

  get userEmail() {
    return this.validateInputs.get('userEmail');
  }

  get username() {
    return this.validateInputs.get('username');
  }

  get password() {
    return this.validateInputs.get('password');
  }

  get confirmPassword() {
    return this.validateInputs.get('confirmPassword');
  }
}
