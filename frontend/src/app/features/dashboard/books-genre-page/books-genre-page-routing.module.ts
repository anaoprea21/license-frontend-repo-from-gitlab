import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksGenrePageMainComponent } from './books-genre-page-main/books-genre-page-main.component';

const routes: Routes = [
  {
    path: '',
    component: BooksGenrePageMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksGenrePageRoutingModule {}
