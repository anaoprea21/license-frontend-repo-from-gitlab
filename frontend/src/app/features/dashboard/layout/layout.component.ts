import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminBookService } from 'src/app/core/api/admin.book.service';
import { BookService } from 'src/app/core/api/book.service';
import { UserService } from 'src/app/core/api/user.service';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  bookGenres: string[] = [];
  isAccountDropdownVisible: boolean = false;

  searchInput!: string;
  options!: { id: string | null; title: string }[];
  constructor(
    private router: Router,
    private adminBookService: AdminBookService,
    private bookService: BookService,
    private socialAuthService: SocialAuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.adminBookService.getAllBookGenres(false).subscribe({
      next: (res) => {
        this.bookGenres = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  searchBook() {
    if (this.searchInput) {
      this.bookService.searchBook(this.searchInput).subscribe({
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
    if (id) this.router.navigate([`/dashboard/book-page/`, id]);
  }

  goToRatings() {
    this.userService.getUsername().subscribe({
      next: (res) => {
        this.router.navigate([`/dashboard/ratings/`, res.response]);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  goToBookList(type: string) {
    this.router.navigate([`/dashboard/book-list/`, type]);
  }

  goToBookGenrePage(type: string) {
    this.router.navigate([`/dashboard/books-genre-page`, type]);
  }

  logOut(): void {
    if (StorageHelper.getAccessToken()) {
      this.socialAuthService.signOut(true);
      StorageHelper.clearStorage();
      this.router.navigateByUrl('/auth/login');
    }
  }
}
