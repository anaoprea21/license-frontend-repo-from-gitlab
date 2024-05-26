import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SpecificBookPageUserViewComponent } from './specific-book-page-user-view/specific-book-page-user-view.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MainPageComponent,
      },
      {
        path: 'book-page/:id',
        component: SpecificBookPageUserViewComponent,
      },
      {
        path: 'books-genre-page',
        loadChildren: () =>
          import('./books-genre-page/books-genre-page.module').then(
            (m) => m.BooksGenrePageModule
          ),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./calendar/calendar.module').then((m) => m.CalendarModule),
      },
      {
        path: 'ratings/:userName',
        loadChildren: () =>
          import('./user-ratings/user-ratings.module').then((m) => m.UserRatingsModule),
      },
      {
        path: 'book-list/:type',
        loadChildren: () =>
          import('./book-list/book-list.module').then((m) => m.BookListModule),
      },
      {
        path: 'library',
        loadChildren: () =>
          import('./library/library.module').then((m) => m.LibraryModule),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account-manager/account-manager.module').then(
            (m) => m.AccountManagerModule
          ),
      },
    ],
    canActivate: [AuthGuard], //DashboardGuard
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
