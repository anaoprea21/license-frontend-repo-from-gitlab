import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryBookPageComponent } from './library-book-page/library-book-page.component';
import { LibraryBooksComponent } from './library-books/library-books.component';
import { LibraryComponent } from './library/library.component';

@NgModule({
  declarations: [
    LibraryComponent,
    LibraryBookPageComponent,
    LibraryBooksComponent,
  ],
  imports: [CommonModule, LibraryRoutingModule, SharedModule],
})
export class LibraryModule {}
