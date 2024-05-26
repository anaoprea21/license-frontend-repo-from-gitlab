import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookCardDataDTO } from 'src/app/shared/interfaces/DTOs/BookCardDataDTO';
import { CartBookDTO } from 'src/app/shared/interfaces/DTOs/CartBookDTO';
import { TemplateResponse } from 'src/app/shared/interfaces/TemplateResponse';
import { HandleUserBookPayload } from 'src/app/shared/interfaces/payloads/HandleUserBookPayload';
import { ApiService } from './api.service';
import { UserBookHandlingActions } from 'src/app/shared/enums/UserBookHandlingActions';
import { UserRatingsDTO } from 'src/app/shared/interfaces/DTOs/UserRatingsDTO';
import { CurrentUserService } from '../services/current-user.service.service';
import { BookType } from 'src/app/shared/enums/BookType';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURL: string = '/user';

  constructor(
    private apiService: ApiService,
    private currentUserService: CurrentUserService
  ) {}

  getLastReadBook(): Observable<
    TemplateResponse<{ bookId: string; picture: string }>
  > {
    return this.apiService.post(
      `${
        this.userURL
      }/get-user-last-book?email=${this.currentUserService.getUserEmail()}`
    );
  }

  addLastReadBook(bookId?: string | null) {
    return this.apiService.post(`${this.userURL}/add-user-last-book`, {
      email: this.currentUserService.getUserEmail(),
      bookId: bookId,
    });
  }

  getUsername() {
    return this.apiService.get(
      `${this.userURL}/get-username/${this.currentUserService.getUserEmail()}`
    );
  }

  refreshAccessToken(accessToken: string) {
    return this.apiService.post(`/auth/refresh-access-token`, accessToken);
  }

  getAccountInfo() {
    return this.apiService.post(
      `${
        this.userURL
      }/get-account-info/${this.currentUserService.getUserEmail()}`
    );
  }

  changeTwoFactorStatus() {
    return this.apiService.put(
      `${this.userURL}/change-account-2fa`,
      this.currentUserService.getUserEmail()
    );
  }

  resetPassword(password: string) {
    return this.apiService.put(`${this.userURL}/change-password`, {
      email: this.currentUserService.getUserEmail(),
      password: password,
    });
  }

  getLibraryBooksNames(): Observable<
    TemplateResponse<{ uuid: string; title: string }[]>
  > {
    return this.apiService.get(
      `${
        this.userURL
      }/get-library-books-names/${this.currentUserService.getUserEmail()}`
    );
  }

  getCartBooks(): Observable<TemplateResponse<CartBookDTO[]>> {
    return this.apiService.post(
      `${this.userURL}/get-cart-books/${this.currentUserService.getUserEmail()}`
    );
  }

  getUserRatings(
    username: string
  ): Observable<TemplateResponse<UserRatingsDTO[]>> {
    return this.apiService.get(`${this.userURL}/get-user-ratings/${username}`);
  }

  getLibraryBooks(
    booktype: BookType
  ): Observable<TemplateResponse<BookCardDataDTO[]>> {
    const body = {
      bookType: booktype,
      email: this.currentUserService.getUserEmail(),
    };
    return this.apiService.post(`${this.userURL}/get-library-books`, body);
  }

  getWishlistBooks(): Observable<TemplateResponse<BookCardDataDTO[]>> {
    return this.apiService.post(
      `${
        this.userURL
      }/get-wishlist-books/${this.currentUserService.getUserEmail()}`
    );
  }

  addBookToCart(
    bookId: string,
    action?: UserBookHandlingActions
  ): Observable<any> {
    const body: HandleUserBookPayload = {
      email: this.currentUserService.getUserEmail(),
      bookIds: [bookId],
      action: action ? action : UserBookHandlingActions.noAction,
    };
    return this.apiService.put(`${this.userURL}/add-book-to-cart`, body);
  }

  removeBookFromCart(
    bookId: string,
    action: UserBookHandlingActions
  ): Observable<any> {
    const body: HandleUserBookPayload = {
      email: this.currentUserService.getUserEmail(),
      bookIds: [bookId],
      action: action,
    };
    return this.apiService.put(`${this.userURL}/remove-book-from-cart`, body);
  }

  addBookToLibrary(bookId: string[]): Observable<any> {
    const body: HandleUserBookPayload = {
      email: this.currentUserService.getUserEmail(),
      bookIds: bookId,
      action: UserBookHandlingActions.noAction,
    };
    return this.apiService.put(`${this.userURL}/add-book-to-library`, body);
  }

  removeBookFromLibrary(bookId: string): Observable<any> {
    const body: HandleUserBookPayload = {
      email: this.currentUserService.getUserEmail(),
      bookIds: [bookId],
      action: UserBookHandlingActions.noAction,
    };
    return this.apiService.put(
      `${this.userURL}/remove-book-from-library`,
      body
    );
  }

  addBookToWishlist(bookId: string): Observable<any> {
    const body: HandleUserBookPayload = {
      email: this.currentUserService.getUserEmail(),
      bookIds: [bookId],
      action: UserBookHandlingActions.noAction,
    };
    return this.apiService.put(`${this.userURL}/add-book-to-wishlist`, body);
  }

  removeBookFromWishlist(bookId: string): Observable<any> {
    const body: HandleUserBookPayload = {
      email: this.currentUserService.getUserEmail(),
      bookIds: [bookId],
      action: UserBookHandlingActions.noAction,
    };
    return this.apiService.put(
      `${this.userURL}/remove-book-from-wishlist`,
      body
    );
  }
}
