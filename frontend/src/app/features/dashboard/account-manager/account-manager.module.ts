import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountManagerRoutingModule } from './account-manager-routing.module';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AccountManagerComponent
  ],
  imports: [
    CommonModule,
    AccountManagerRoutingModule,
    SharedModule
  ]
})
export class AccountManagerModule { }
