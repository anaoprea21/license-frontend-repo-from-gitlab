import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BookCardDataDTO } from 'src/app/shared/interfaces/DTOs/BookCardDataDTO';
import { TemplateResponse } from 'src/app/shared/interfaces/TemplateResponse';
import { GetBooksByGenrePayload } from 'src/app/shared/interfaces/payloads/GetBooksByGenrePayload';
import { ApiService } from './api.service';
import { CarouselBookDTO } from 'src/app/shared/interfaces/DTOs/CarouselBookDTO';
import { GetCarouselBooks } from 'src/app/shared/interfaces/payloads/GetCarouselBooks';
import { BookRatingsDTO } from 'src/app/shared/interfaces/DTOs/BookRatingsDTO';
import { AddRatingDTO } from 'src/app/shared/interfaces/DTOs/AddRatingDTO';
import { CurrentUserService } from '../services/current-user.service.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private bookURL: string = '/book';
  constructor(
    private apiService: ApiService,
    private currentUserService: CurrentUserService
  ) {}

  searchBook(searchString: string) {
    return this.apiService.get(`${this.bookURL}/search-books/${searchString}`);
  }

  getCarouselBooks(
    body: GetCarouselBooks
  ): Observable<TemplateResponse<CarouselBookDTO[]>> {
    return this.apiService
      .post(`${this.bookURL}/get-carousel-books`, body)
      .pipe(
        map((backendResponse: TemplateResponse<CarouselBookDTO[]>) => {
          let frontendResponse = backendResponse;
          frontendResponse.response.forEach((element) => {
            element.rating = element.rating / 2;
          });
          return backendResponse;
        })
      );
  }

  getCarouselPopularBooks(
    body: GetCarouselBooks
  ): Observable<TemplateResponse<CarouselBookDTO[]>> {
    return this.apiService.post(`${this.bookURL}/get-popular-books`, body).pipe(
      map((backendResponse: TemplateResponse<CarouselBookDTO[]>) => {
        let frontendResponse = backendResponse;
        frontendResponse.response.forEach((element) => {
          element.rating = element.rating / 2;
        });
        return backendResponse;
      })
    );
  }

  getBooksByGenre(
    body: GetBooksByGenrePayload
  ): Observable<
    TemplateResponse<{ data: BookCardDataDTO[]; totalCount: number }>
  > {
    return this.apiService.post(`${this.bookURL}/get-books-by-genre`, body);
  }

  getRecentlyAddedBooks() {
    return this.apiService.post(
      `${
        this.bookURL
      }/get-recently-added?email=${this.currentUserService.getUserEmail()}`
    );
  }

  getRecommendedBooks() {
    return this.apiService.get(
      `/user/get-user-recommendations/${this.currentUserService.getUserEmail()}`
    );
  }

  getBookRatings(
    bookId: string
  ): Observable<TemplateResponse<BookRatingsDTO[]>> {
    return this.apiService
      .get(`${this.bookURL}/get-book-ratings/${bookId}`)
      .pipe(
        map((res: TemplateResponse<BookRatingsDTO[]>) => {
          let result = res;
          result.response.forEach((element) => {
            element.rating = element.rating / 2;
            console.log(element.rating);
          });

          return result;
        })
      );
  }

  addBookRatings(
    newRating: AddRatingDTO
  ): Observable<TemplateResponse<BookRatingsDTO[]>> {
    return this.apiService.post(`${this.bookURL}/add-book-review`, newRating);
  }
}
