import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/core/api/auth.service';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { CustomValidator } from 'src/app/core/helpers/validators.helper';
import { CurrentUserService } from 'src/app/core/services/current-user.service.service';
import { UserRole } from 'src/app/shared/interfaces/UserRole';
import { CreateNewUserPayload } from 'src/app/shared/interfaces/payloads/CreateNewUserPayload';
import { GoogleLoginPayload } from 'src/app/shared/interfaces/payloads/GoogleLoginPayload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateInputs: FormGroup;
  googleResponse!: GoogleLoginPayload;
  isPasswordVisible: boolean = false;
  isLoggingIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private notification: NzNotificationService,
    private authService: AuthService,
    private userService: CurrentUserService
  ) {
    this.validateInputs = this.formBuilder.group({
      userEmail: [null, [Validators.required, CustomValidator.emailValidator]],
      password: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  verifyData() {
    this.isLoggingIn = true;
    if (this.userEmail?.valid && this.password?.valid) {
      const user: CreateNewUserPayload = {
        email: this.userEmail.value,
        password: this.password.value,
      };
      this.authService.userLogin(user).subscribe({
        next: (res) => {
          if (res.response?.accessToken) {
            StorageHelper.saveAccessTokenLocal(res.response.accessToken);
            StorageHelper.saveRefreshTokenLocal(res.response.refreshToken);
            if (this.userService.getUserRole() === UserRole.user)
              this.router.navigate(['/dashboard']);
            else
              this.router.navigate([`/admin/books-table`], {
                queryParams: { type: 'all' },
              });
          } else this.router.navigate(['auth/two-factor']);

          this.isLoggingIn = false;
        },
        error: (err) => {
          console.error(err);
          this.notification.create('error', 'Error', err.error.message);
          this.isLoggingIn = false;
        },
      });
    } else {
      this.notification.create(
        'error',
        'Error',
        'Ups! Something went wrong... 😢'
      );
      this.userEmail?.markAsDirty();
      this.password?.markAsDirty();
      this.isLoggingIn = false;
    }
  }

  get userEmail() {
    return this.validateInputs.get('userEmail');
  }

  get password() {
    return this.validateInputs.get('password');
  }
}
