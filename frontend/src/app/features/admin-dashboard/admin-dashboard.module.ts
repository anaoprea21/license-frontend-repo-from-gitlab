import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SpecificBookPageComponent } from './specific-book-page/specific-book-page.component';

@NgModule({
  declarations: [LayoutComponent, SpecificBookPageComponent],
  imports: [CommonModule, AdminDashboardRoutingModule, SharedModule],
})
export class AdminDashboardModule {}
