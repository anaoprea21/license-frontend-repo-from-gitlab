import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/core/api/user.service';
import { BookType } from 'src/app/shared/enums/BookType';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { BookCardDataDTO } from 'src/app/shared/interfaces/DTOs/BookCardDataDTO';
import { CartBookDTO } from 'src/app/shared/interfaces/DTOs/CartBookDTO';
enum pageTitle {
  WISHLIST = 'My Wishlist',
  CART = 'My Cart',
}

enum pageType {
  WISHLIST = 'wishlist',
  CART = 'cart',
}

@Component({
  selector: 'app-book-list-main',
  templateUrl: './book-list-main.component.html',
  styleUrls: ['./book-list-main.component.scss'],
})
export class BookListMainComponent implements OnInit {
  pageType!: pageType;
  pageTitle!: pageTitle;

  isBookListEmpty = false;

  booksTotal!: string;

  books!: BookCardDataDTO[];

  cartBooks!: CartBookDTO[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private notification: NzNotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const type = params.get('type');
      if (type === pageType.CART) {
        this.pageType = type;
        this.pageTitle = pageTitle.CART;
        this.getCartBooks();
        return;
      }
      if (type === pageType.WISHLIST) {
        this.pageType = type;
        this.pageTitle = pageTitle.WISHLIST;
        this.getWishlistBooks();
      }
    });
  }

  getCartBooks() {
    this.userService.getCartBooks().subscribe({
      next: (res) => {
        this.cartBooks = res.response;
        this.isBookListEmpty = false;
      },
      error: (err) => {
        console.error(err);
        if (err.error.message === 'NO_BOOKS_IN_CART') {
          this.isBookListEmpty = true;
          return;
        }
        this.notification.create('error', 'Error', err.error.message);
      },
    });
  }

  getWishlistBooks() {
    this.userService.getWishlistBooks().subscribe({
      next: (res) => {
        this.isBookListEmpty = false;
        this.books = res.response;
      },
      error: (err) => {
        console.error(err);
        if (err.error.message === 'NO_BOOKS_IN_WISHLIST') {
          this.isBookListEmpty = true;
          return;
        }
        this.notification.create('error', 'Error', err.error.message);   
      },
    });
  }
}
