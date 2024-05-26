import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryBookPageComponent } from './library-book-page/library-book-page.component';
import { LibraryBooksComponent } from './library-books/library-books.component';
import { LibraryComponent } from './library/library.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
    children: [
      {
        path: '',
        component: LibraryBooksComponent,
      },
      {
        path: ':id',
        component: LibraryBookPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
