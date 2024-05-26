import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BookService } from 'src/app/core/api/book.service';
import { MappingHelper } from 'src/app/core/helpers/mapping.helper';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { CurrentUserService } from 'src/app/core/services/current-user.service.service';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { CarouselBookDTO } from 'src/app/shared/interfaces/DTOs/CarouselBookDTO';
import { GetCarouselBooks } from 'src/app/shared/interfaces/payloads/GetCarouselBooks';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  booksData!: CarouselBookDTO[][];
  recentBooksData!: CarouselBookDTO[][];
  popularBooksData!: CarouselBookDTO[][];

  constructor(
    private bookService: BookService,
    private notification: NzNotificationService,
    private mappingHelper: MappingHelper,
    private currentUserSrevice: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.getCarouselBooks();
    this.getRecentBooks();
    this.getCarouselPopularBooks();
  }

  getCarouselBooks() {
    const token = StorageHelper.getAccessToken();
    if (token) {
      const body: GetCarouselBooks = {
        email: this.currentUserSrevice.getUserEmail(),
        type: '',
        page: 0,
        pageSize: 18,
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

  getCarouselPopularBooks() {
    const token = StorageHelper.getAccessToken();
    if (token) {
      const body: GetCarouselBooks = {
        email: this.currentUserSrevice.getUserEmail(),
        type: '',
        page: 0,
        pageSize: 18,
      };
      this.bookService.getCarouselPopularBooks(body).subscribe({
        next: (res) => {
          this.popularBooksData = this.mappingHelper.mapCarouselBooks(
            res.response,
            6
          );
        },
        error: (err) => {
          console.error(err);
          this.notification.create('error', 'Error', err.error.message);
        },
      });
    }
  }

  getRecentBooks() {
    this.bookService.getRecentlyAddedBooks().subscribe({
      next: (res) => {
        this.recentBooksData = this.mappingHelper.mapCarouselBooks(
          res.response,
          6
        );
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);   
      },
    });
  }
}
