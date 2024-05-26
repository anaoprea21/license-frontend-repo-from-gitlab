import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { LayoutComponent } from './layout/layout.component';
import { SpecificBookPageUserViewComponent } from './specific-book-page-user-view/specific-book-page-user-view.component';

@NgModule({
  declarations: [MainPageComponent, LayoutComponent, SpecificBookPageUserViewComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
