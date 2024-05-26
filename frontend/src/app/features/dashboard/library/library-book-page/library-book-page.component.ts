import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminBookService } from 'src/app/core/api/admin.book.service';
import { UserService } from 'src/app/core/api/user.service';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { BookType } from 'src/app/shared/enums/BookType';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { AdminManageBookDTO } from 'src/app/shared/interfaces/DTOs/AdminManageBookDTO';

@Component({
  selector: 'app-library-book-page',
  templateUrl: './library-book-page.component.html',
  styleUrls: ['./library-book-page.component.scss'],
})
export class LibraryBookPageComponent implements OnInit {
  bookId!: string | null;
  bookData!: AdminManageBookDTO;

  bookType = BookType;

  seenDescription!: string;
  hiddenDescription!: string;
  isWholeDescriptionVisible = false;

  isBookContentVisible = false;

  constructor(
    private adminBookService: AdminBookService,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.bookId = params.get('id');
      this.getBookData();
    });

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
  }

  pdfFile() {
    return (this.domSanitizer.bypassSecurityTrustHtml(this.bookData.filePath) as SafeHtml);
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
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);   
      },
    });
  }

  read() {
    this.isBookContentVisible = !this.isBookContentVisible;

    this.userService.addLastReadBook(this.bookId).subscribe({
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);   
      },
    });
  }

  handleCancel() {
    this.isBookContentVisible = false;
  }
}
