import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminBookService } from 'src/app/core/api/admin.book.service';
import { BookService } from 'src/app/core/api/book.service';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { CurrentUserService } from 'src/app/core/services/current-user.service.service';
import { BookType } from 'src/app/shared/enums/BookType';
import { NotifText } from 'src/app/shared/enums/notif.text';

import { BookCardDataDTO } from 'src/app/shared/interfaces/DTOs/BookCardDataDTO';
import { GetBooksByGenrePayload } from 'src/app/shared/interfaces/payloads/GetBooksByGenrePayload';

@Component({
  selector: 'app-books-genre-page-main',
  templateUrl: './books-genre-page-main.component.html',
  styleUrls: ['./books-genre-page-main.component.scss'],
})
export class BooksGenrePageMainComponent implements OnInit {
  booksData: BookCardDataDTO[] = [];
  bookType!: BookType;

  genreCheckBoxes: { label: string; value: boolean }[] = [];

  filters: {
    audio: boolean;
    ebook: boolean;
    genre: string[];
  } = {
    audio: false,
    ebook: false,
    genre: [],
  };

  body!: GetBooksByGenrePayload;
  constructor(
    private bookService: BookService,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute,
    private currentUserSrevice: CurrentUserService,
    private adminBookService: AdminBookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBookGenres();
    this.onInit();
  }

  onInit() {
    console.log(this.currentUserSrevice.getUserRole());

    this.body = {
      totalCount: 30,
      pageSize: 8,
      genre: [],
      page: 1,
      email: this.currentUserSrevice.getUserEmail(),
      type: this.bookType,
    };

    this.activatedRoute.queryParams.subscribe({
      next: (res) => {
        this.bookType = res['type'];
        if (this.bookType === BookType.AUDIO) {
          this.filters.audio = true;
          this.filters.ebook = false;
        } else if (this.bookType === BookType.EBOOK) {
          this.filters.audio = false;
          this.filters.ebook = true;
        } else {
          this.filters.audio = true;
          this.filters.ebook = true;
        }

        if (res['genre']) {
          this.filters.genre = [];
          if (!Array.isArray(res['genre'])) {
            this.filters.genre.push(res['genre']);
          } else {
            this.filters.genre = res['genre'];
          }

          this.filters.genre.forEach((element) => {
            const index = this.genreCheckBoxes.findIndex(
              (genre) => genre.label === element
            );

            if (index > -1) this.genreCheckBoxes[index].value = true;
          });
        }
        this.addFiltersToURL();
      },
    });
  }

  getBookGenres() {
    this.adminBookService.getAllBookGenres(false).subscribe({
      next: (res) => {
        res.forEach((element) => {
          this.genreCheckBoxes.push({ label: element, value: false });
        });
        this.onInit();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getBooks(resetPag?: boolean) {
    if (resetPag) {
      this.body.page = 1;
    }
    this.body.type = this.bookType as BookType;
    this.body.genre = this.filters.genre;

    this.bookService.getBooksByGenre(this.body).subscribe({
      next: (res) => {
        this.booksData = res.response.data;
        if (this.body.type != BookType.ALL || this.body.genre.length > 0)
          this.body.totalCount = 0;
        else this.body.totalCount = res.response.totalCount;
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);   
      },
    });
  }

  genreFilters(value: any) {
    const index = this.genreCheckBoxes.indexOf(value);
    this.genreCheckBoxes[index].value = !this.genreCheckBoxes[index].value;
    if (this.genreCheckBoxes[index].value) {
      this.filters.genre.push(this.genreCheckBoxes[index].label);
      this.getBooks(true);
      return;
    }
    const index2 = this.filters.genre.indexOf(
      this.genreCheckBoxes[index].label
    );
    this.filters.genre.splice(index2, 1);
    this.getBooks(true);
  }

  addFiltersToURL() {
    let type: string;
    if (this.bookType === null) type = 'All';
    else type = this.bookType;
    this.router.navigate([], {
      queryParams: {
        type: type,
        genre: this.filters.genre,
      },
      replaceUrl: true,
    });
    this.getBooks(true);
  }

  typeFilters(isAudio: boolean) {
    if (isAudio && this.filters.audio === false && this.filters.ebook === false)
      this.filters.ebook = true;

    if (
      !isAudio &&
      this.filters.audio === false &&
      this.filters.ebook === false
    )
      this.filters.audio = true;

    if (this.filters.audio === true && this.filters.ebook === false)
      this.bookType = BookType.AUDIO;

    if (this.filters.audio === false && this.filters.ebook === true)
      this.bookType = BookType.EBOOK;

    if (this.filters.audio === true && this.filters.ebook === true)
      this.bookType = BookType.ALL;

    this.addFiltersToURL();
  }
}
