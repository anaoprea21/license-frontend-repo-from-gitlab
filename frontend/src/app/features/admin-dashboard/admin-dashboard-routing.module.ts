import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './../admin-dashboard/layout/layout.component';
import { SpecificBookPageComponent } from './specific-book-page/specific-book-page.component';
import { AdminGuard } from 'src/app/core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'books-table',
        loadChildren: () =>
          import('./book-manager/book-manager.module').then(
            (m) => m.BookManagerModule
          ),
      },
      {
        path: 'book-page/:id',
        component: SpecificBookPageComponent,
      },
      {
        path: '**',
        redirectTo: 'books-table',
      },
    ],
    // canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
