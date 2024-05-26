import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { BackgroundComponent } from './background/background.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { TwoFactorCodeComponent } from './two-factor-code/two-factor-code.component';

@NgModule({
  declarations: [BackgroundComponent, LoginComponent, RegisterComponent, TwoFactorCodeComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
