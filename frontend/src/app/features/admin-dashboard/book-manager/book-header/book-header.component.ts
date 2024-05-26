import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/core/api/book.service';

@Component({
  selector: 'app-book-header',
  templateUrl: './book-header.component.html',
  styleUrls: ['./book-header.component.scss'],
})
export class BookHeaderComponent implements OnInit {
  @Output() refreshTableData = new EventEmitter<void>();
  isVisible: boolean = false;

  searchText!: string;
  options!: { id: string | null; title: string }[];

  constructor(private router: Router, private bookService: BookService) {}

  ngOnInit(): void {}

  changeModalVisibility() {
    this.isVisible = true;
  }

  search() {
    if (this.searchText) {
      this.bookService.searchBook(this.searchText).subscribe({
        next: (res) => {
          this.options = [];

          if (res.response.length !== 0) {
            this.options = res.response;
          } else {
            this.options.push({ title: 'No match found', id: null });
          }
        },
        error: (err) => {
          this.options = [];

          console.error(err);
          this.options.push({ title: 'No match found', id: null });
        },
      });
    }
  }

  goToBookPage(id: string | null) {
    if (id) this.router.navigate([`/admin/book-page/`, id]);
  }

  refreshData() {
    this.refreshTableData.emit();
  }
}
