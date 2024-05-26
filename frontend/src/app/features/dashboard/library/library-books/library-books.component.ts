import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/core/api/user.service';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { BookType } from 'src/app/shared/enums/BookType';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { BookCardDataDTO } from 'src/app/shared/interfaces/DTOs/BookCardDataDTO';

@Component({
  selector: 'app-library-books',
  templateUrl: './library-books.component.html',
  styleUrls: ['./library-books.component.scss'],
})
export class LibraryBooksComponent implements OnInit {
  books!: BookCardDataDTO[];
  breadcrumbs: { name: string; param: string | null }[] = [];

  isBookTypeSelected: boolean = false;
  libraryBookType!: string;

  bookCover!: string;
  bookId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private notification: NzNotificationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getLastReadBook().subscribe({
      next: (res) => {
        this.bookCover = res.response.picture;
        this.bookId = res.response.bookId;
      },
    });

    this.activatedRoute.queryParams.subscribe({
      next: (res) => {
        if (res['type']) {
          this.goTo(res['type']);
          return;
        }
        this.goBack();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getLibraryBooks(bookType: BookType) {
    this.userService.getLibraryBooks(bookType).subscribe({
      next: (res) => {
        this.books = res.response;
      },
      error: (err) => {
        console.error(err);
        const message =
        Object.entries(NotifText).find(([key, val]) => {
          key === err.error.messsage;
          return val;
        })?.[1] ?? err.error.message;
      this.notification.create('error', 'Error', message);
      },
    });
  }

  getLastReadBook() {
    this.router.navigate([`/dashboard/library/`, this.bookId]);
  }

  goTo(destination: BookType) {
    this.books = [];
    this.breadcrumbs.push({ name: 'My Books', param: null });

    if (destination) {
      this.breadcrumbs.push({
        name: destination.charAt(0).toLocaleUpperCase() + destination.slice(1),
        param: destination,
      });

      this.libraryBookType = destination;
      this.isBookTypeSelected = true;
      this.getLibraryBooks(destination);
    }
  }

  goBack() {
    this.isBookTypeSelected = false;
    this.breadcrumbs = [];
  }
}
