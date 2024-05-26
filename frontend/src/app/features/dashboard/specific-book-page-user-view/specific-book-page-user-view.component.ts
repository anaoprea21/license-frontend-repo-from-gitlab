import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminBookService } from 'src/app/core/api/admin.book.service';
import { BookService } from 'src/app/core/api/book.service';
import { UserService } from 'src/app/core/api/user.service';
import { MappingHelper } from 'src/app/core/helpers/mapping.helper';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { CurrentUserService } from 'src/app/core/services/current-user.service.service';
import { BookType } from 'src/app/shared/enums/BookType';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { AdminManageBookDTO } from 'src/app/shared/interfaces/DTOs/AdminManageBookDTO';
import { BookRatingsDTO } from 'src/app/shared/interfaces/DTOs/BookRatingsDTO';
import { CarouselBookDTO } from 'src/app/shared/interfaces/DTOs/CarouselBookDTO';
import { GetCarouselBooks } from 'src/app/shared/interfaces/payloads/GetCarouselBooks';

@Component({
  selector: 'app-specific-book-page-user-view',
  templateUrl: './specific-book-page-user-view.component.html',
  styleUrls: ['./specific-book-page-user-view.component.scss'],
})
export class SpecificBookPageUserViewComponent implements OnInit {
  bookId!: string | null;
  bookData!: AdminManageBookDTO;

  bookRatings: BookRatingsDTO[] = [];

  booksData!: CarouselBookDTO[][];

  seenDescription!: string;
  hiddenDescription!: string;
  isWholeDescriptionVisible = false;
  isReviewsContainerOpen = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminBookService: AdminBookService,
    private bookService: BookService,
    private notification: NzNotificationService,
    private mappingHelper: MappingHelper,
    private userService: UserService,
    private currentUserSrevice: CurrentUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.bookId = params.get('id');
      this.getBookData();
      this.getCarouselBooks();
    });
  }

  goToRatings(userName: string) {
    this.router.navigate([`/dashboard/ratings/`, userName]);
  }

  getCarouselBooks() {
    const token = StorageHelper.getAccessToken();
    if (token) {
      const body: GetCarouselBooks = {
        email: this.currentUserSrevice.getUserEmail(),
        type: '',
        page: 0,
        pageSize: 12,
      };
      this.bookService.getCarouselBooks(body).subscribe({
        next: (res) => {
          this.booksData = this.mappingHelper.mapCarouselBooks(res.response, 6);
        },
        error: (err) => {
          console.error(err);
          this.notification.create('error', 'Error', err.error.message);
        },
      });
    }
  }

  getBookData() {
    this.adminBookService.getBookById(this.bookId).subscribe({
      next: (res) => {
        this.bookData = res.response;

        const index =
          this.bookData?.description.indexOf('\n') === -1
            ? this.bookData?.description.length
            : this.bookData?.description.indexOf('\n');

        this.seenDescription = this.bookData?.description.slice(0, index);
        if (index !== -1)
          this.hiddenDescription = this.bookData?.description.slice(
            index + 1,
            this.bookData.description.length
          );

        this.getBookRatings(this.bookData.id);
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);   
      },
    });
  }

  getBookRatings(id: string) {
    this.bookService.getBookRatings(id).subscribe({
      next: (res) => {
        this.bookRatings = res.response;
        console.log(res);
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);   
      },
    });
  }

  changeDescriptionVisibility() {
    this.isWholeDescriptionVisible = !this.isWholeDescriptionVisible;
  }

  goToBookGenrePage(genre: string) {
    this.router.navigate([`/dashboard/books-genre-page/`, genre]);
  }

  addToCart() {
    this.userService.addBookToCart(this.bookData.id).subscribe({
      next: (res) => {
        this.notification.create('success', 'Success', 'Book added to cart!');
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);   
      },
    });
  }

  addToWishlist() {
    this.userService.addBookToWishlist(this.bookData.id).subscribe({
      next: (res) => {
        this.notification.create(
          'success',
          'Success',
          'Book added to wishlist!'
        );
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);   
      },
    });
  }
}
