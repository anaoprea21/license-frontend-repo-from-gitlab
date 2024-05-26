import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { LoggedInGuard } from 'src/app/core/guards/logged-in.guard';
import { BackgroundComponent } from './background/background.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TwoFactorCodeComponent } from './two-factor-code/two-factor-code.component';

const routes: Routes = [
  {
    path: '',
    component: BackgroundComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'two-factor', component: TwoFactorCodeComponent },
    ],
    canActivate: [LoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
