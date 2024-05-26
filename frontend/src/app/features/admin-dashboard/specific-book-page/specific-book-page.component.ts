import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminBookService } from 'src/app/core/api/admin.book.service';
import { BookService } from 'src/app/core/api/book.service';
import { UserService } from 'src/app/core/api/user.service';
import { MappingHelper } from 'src/app/core/helpers/mapping.helper';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { AdminManageBookDTO } from 'src/app/shared/interfaces/DTOs/AdminManageBookDTO';
import { CarouselBookDTO } from 'src/app/shared/interfaces/DTOs/CarouselBookDTO';

@Component({
  selector: 'app-specific-book-page',
  templateUrl: './specific-book-page.component.html',
  styleUrls: ['./specific-book-page.component.scss'],
})
export class SpecificBookPageComponent implements OnInit {
  bookId!: string | null;
  bookData!: AdminManageBookDTO;

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.bookId = params.get('id');
      this.getBookData();
    });
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
        const message =
        Object.entries(NotifText).find(([key, val]) => {
          key === err.error.messsage;
          return val;
        })?.[1] ?? err.error.message;
      this.notification.create('error', 'Error', message);
      },
    });
  }

  changeDescriptionVisibility() {
    this.isWholeDescriptionVisible = !this.isWholeDescriptionVisible;
  }
}
