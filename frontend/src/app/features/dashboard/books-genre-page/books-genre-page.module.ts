import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { BooksGenrePageMainComponent } from './books-genre-page-main/books-genre-page-main.component';
import { BooksGenrePageRoutingModule } from './books-genre-page-routing.module';

@NgModule({
  declarations: [BooksGenrePageMainComponent],
  imports: [CommonModule, BooksGenrePageRoutingModule, SharedModule],
})
export class BooksGenrePageModule {}
