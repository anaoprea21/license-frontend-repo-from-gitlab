import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagerComponent } from './account-manager/account-manager.component';

const routes: Routes = [{ path: '', component: AccountManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountManagerRoutingModule {}
