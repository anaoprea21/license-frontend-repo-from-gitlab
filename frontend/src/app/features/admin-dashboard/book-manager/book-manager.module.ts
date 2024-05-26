import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookManagerRoutingModule } from './book-manager-routing.module';
import { BookHeaderComponent } from './book-header/book-header.component';
import { BookManagerComponent } from './book-manager/book-manager.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BooksTableComponent } from './books-table/books-table.component';

@NgModule({
  declarations: [
    BookHeaderComponent,
    BookManagerComponent,
    BooksTableComponent,
  ],
  imports: [CommonModule, BookManagerRoutingModule, SharedModule],
})
export class BookManagerModule {}
