import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminBookService } from 'src/app/core/api/admin.book.service';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { BookType } from 'src/app/shared/enums/BookType';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { TableAdminBookDTO } from 'src/app/shared/interfaces/DTOs/TableAdminBookDTO';

@Component({
  selector: 'app-book-manager',
  templateUrl: './book-manager.component.html',
  styleUrls: ['./book-manager.component.scss'],
})
export class BookManagerComponent implements OnInit {
  isVisible: boolean = false;
  booksData!: TableAdminBookDTO[];
  isLoadingTableData: boolean = false;

  bookType?: BookType | null = null;

  sortingData: { orderBy: string; isDesc: string } = {
    isDesc: 'ASC',
    orderBy: 'TITLE',
  };

  constructor(
    private bookService: AdminBookService,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.bookType =
      this.activatedRoute.snapshot.params['type'] === 'all'
        ? null
        : this.activatedRoute.snapshot.params['type'];
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (res) => {
        if (res['type']) {
          this.bookType = res['type'] === 'all' ? 'All' : res['type'];
          this.getBooks();
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getBooks() {
    this.isLoadingTableData = true;

    const token = StorageHelper.getAccessToken();
    if (token) {
      this.bookService
        .getAllBooks(
          this.sortingData.orderBy,
          this.sortingData.isDesc,
          this.bookType
        )
        .subscribe({
          next: (res) => {
            this.booksData = res.response;
            this.isLoadingTableData = false;
          },
          error: (err) => {
            console.error(err);
            this.isLoadingTableData = false;
            const message =
              Object.entries(NotifText).find(([key, val]) => {
                key === err.error.messsage;
                return val;
              })?.[1] ?? err.error.message;
            this.notification.create('error', 'Error', message);
          },
        });
    }
  }

  refresh(event: { orderBy: string; isDesc: string }) {
    this.sortingData = {
      isDesc: event.isDesc,
      orderBy: event.orderBy,
    };

    this.getBooks();
  }
}
