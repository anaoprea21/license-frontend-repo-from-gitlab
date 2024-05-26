import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminBookService } from 'src/app/core/api/admin.book.service';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { AdminManageBookDTO } from 'src/app/shared/interfaces/DTOs/AdminManageBookDTO';
import { TableAdminBookDTO } from 'src/app/shared/interfaces/DTOs/TableAdminBookDTO';

enum SortField {
  title = 'TITLE',
  publisher = 'PUBLISHER',
  rating = 'RATING',
}
@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.scss'],
})
export class BooksTableComponent implements OnInit {
  @Input() booksData!: TableAdminBookDTO[];
  @Input() isLoading!: boolean;
  @Output() refreshTableData = new EventEmitter<{
    orderBy: SortField;
    isDesc: string;
  }>();

  isVisible: boolean = false;
  isEditing: boolean = true;
  bookId!: string;
  bookData!: AdminManageBookDTO;

  filters: { orderBy: SortField; isDesc: string } = {
    isDesc: 'ASC',
    orderBy: SortField.title,
  };
  sortField = SortField;

  constructor(
    private router: Router,
    private bookService: AdminBookService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {}

  editBook(id: string) {
    this.bookId = id;
    this.isEditing = true;

    this.bookService.getBookById(id).subscribe({
      next: (res) => {
        this.bookData = res.response;
        this.isVisible = true;
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);
      },
    });
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.notification.create(
          'success',
          'Success',
          'Book deleted successfully!'
        );
        this.refreshData();
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);
      },
    });
  }

  goToBookPage(id: string) {
    this.router.navigateByUrl(`admin/book-page/${id}`);
  }

  changeSortOrder(event: string | null, field: SortField) {
    if (event == null && field === SortField.title) return;

    this.filters.orderBy = field;

    switch (event) {
      case 'ascend':
        this.filters.isDesc = 'ASC';
        break;

      case 'descend':
        this.filters.isDesc = 'DESC';

        break;

      default:
        this.filters.isDesc = 'DESC';
        this.filters.orderBy = SortField.title;

        break;
    }
    this.refreshData();
  }

  refreshData() {
    this.refreshTableData.emit(this.filters);
  }
}
