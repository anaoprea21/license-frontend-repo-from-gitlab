import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/core/api/user.service';
import { ColorThemeService } from 'src/app/core/helpers/color.theme.service';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { CustomValidator } from 'src/app/core/helpers/validators.helper';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { AccountInfoDTO } from 'src/app/shared/interfaces/DTOs/AccountInfoDTO';

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.scss'],
})
export class AccountManagerComponent implements OnInit {
  validateInputs!: FormGroup;
  accountData!: AccountInfoDTO;

  selectedId: number = 2;

  colors: { id: number; left: string; right: string; themeName: string }[] = [
    {
      id: 0,
      right: 'background-color: #f07878',
      left: 'background-color: #e64747',
      themeName: 'red',
    },
    {
      id: 1,
      right: 'background-color: #ffe2e2',
      left: 'background-color: #d77d7d',
      themeName: 'default',
    },
    {
      id: 2,
      right: 'background-color: #e5bfff',
      left: 'background-color: #c27df0',
      themeName: 'purple',
    },
    {
      id: 3,
      right: 'background-color: #5fbedb',
      left: 'background-color: #388ca5',
      themeName: 'aqua',
    },
    {
      id: 4,
      right: 'background-color: #ca9a40',
      left: 'background-color: #ffcc6d',
      themeName: 'yellow',
    },
  ];

  isPasswordVisible = false;
  isConfirmPasswordVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private userService: UserService,
    private router: Router,
    private colorThemeService: ColorThemeService
  ) {
    this.getAccountInfo();
  }

  ngOnInit(): void {
    if (StorageHelper.getTheme())
      this.selectedId = this.colors.findIndex(
        (color) => color.themeName === StorageHelper.getTheme()
      );
  }

  initializeForm() {
    this.validateInputs = this.formBuilder.group({
      email: [
        this.accountData?.email,
        [Validators.required, CustomValidator.emailValidator],
      ],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  getAccountInfo() {
    this.userService.getAccountInfo().subscribe({
      next: (res) => {
        this.accountData = res.response;

        this.initializeForm();
      },
      error: (err) => {
        this.notification.create('error', 'Error', err.error.message);
      },
    });
  }

  changeTwoFactorStatus() {
    this.accountData.twoFactorStatus = !this.accountData.twoFactorStatus;

    this.userService.changeTwoFactorStatus().subscribe({
      next: (res) => {},
      error: (err) => {
        this.notification.create('error', 'Error', err.error.message);
      },
    });
  }

  resetPassword() {
    if (this.password?.valid && this.confirmPassword?.valid) {
      if (this.password.value === this.confirmPassword.value) {
        this.userService.resetPassword(this.password?.value).subscribe({
          next: (res) => {
            this.initializeForm();

            this.notification.create('success', 'Success', 'Success');
          },
          error: (err) => {
            const message =
              Object.entries(NotifText).find(([key, val]) => {
                key === err.error.messsage;
                return val;
              })?.[1] ?? err.error.message;
            this.notification.create('error', 'Error', message);
          },
        });
        return;
      }
      this.notification.create(
        'warning',
        'Warning',
        'Passwords must coincide!'
      );
      return;
    }
    this.notification.create('error', 'Error', 'Check fields');
    this.password?.markAsDirty();
    this.confirmPassword?.markAsDirty();
  }

  goToRecentlyAdded() {
    this.userService.getLastReadBook().subscribe({
      next: (res) => {
        this.router.navigate([`/dashboard/library/`, res.response.bookId]);
      },
    });
  }

  selectTheme(color: any) {
    this.selectedId = color.id;
    this.colorThemeService.switchTheme(color.themeName);
  }

  goToRatings() {
    this.router.navigate([`/dashboard/ratings/`, this.accountData.username]);
  }

  get email() {
    return this.validateInputs.get('email');
  }

  get password() {
    return this.validateInputs.get('password');
  }

  get confirmPassword() {
    return this.validateInputs.get('confirmPassword');
  }
}
