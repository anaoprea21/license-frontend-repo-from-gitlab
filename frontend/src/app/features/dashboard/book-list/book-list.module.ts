import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookListRoutingModule } from './book-list-routing.module';
import { BookListMainComponent } from './book-list-main/book-list-main.component';
import { BookCartDataComponent } from './book-cart-data/book-cart-data.component';
import { CartBookListComponent } from './cart-book-list/cart-book-list.component';
import { WishlistBookListComponent } from './wishlist-book-list/wishlist-book-list.component';


@NgModule({
  declarations: [
    BookListMainComponent,
    BookCartDataComponent,
    CartBookListComponent,
    WishlistBookListComponent
  ],
  imports: [
    CommonModule,
    BookListRoutingModule,
    SharedModule
  ]
})
export class BookListModule { }
