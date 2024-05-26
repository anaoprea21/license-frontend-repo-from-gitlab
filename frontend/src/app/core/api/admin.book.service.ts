import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BookType } from 'src/app/shared/enums/BookType';
import { AdminManageBookDTO } from 'src/app/shared/interfaces/DTOs/AdminManageBookDTO';
import { TableAdminBookDTO } from 'src/app/shared/interfaces/DTOs/TableAdminBookDTO';
import { TemplateResponse } from 'src/app/shared/interfaces/TemplateResponse';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminBookService {
  private bookURL: string = '/book';
  constructor(private apiService: ApiService) {}

  getBookById(
    uuid: string | null
  ): Observable<TemplateResponse<AdminManageBookDTO>> {
    return this.apiService.get(`${this.bookURL}/get-book/${uuid}`).pipe(
      map((backendResponse: TemplateResponse<AdminManageBookDTO>) => {
        let frontendResponse = backendResponse;
        frontendResponse.response.rating = frontendResponse.response.rating
          ? frontendResponse.response.rating / 2
          : 0;
        return backendResponse;
      })
    );
  }

  createBook(newBookData: AdminManageBookDTO): Observable<any> {
    return this.apiService.post(`${this.bookURL}/add-book`, newBookData);
  }

  editBook(updatedBook: AdminManageBookDTO): Observable<any> {
    return this.apiService.put(`${this.bookURL}/edit-book`, updatedBook);
  }

  deleteBook(uuid: string): Observable<any> {
    return this.apiService.delete(`${this.bookURL}/delete-book/${uuid}`);
  }

  getAllBookGenres(isUsedInDropdown: boolean): Observable<any[]> {
    return this.apiService.get(`${this.bookURL}/get-book-categories`).pipe(
      map((backendResponse: TemplateResponse<string[]>) => {
        if (isUsedInDropdown) {
          let frontendResponse: { value: string; label: string }[] = [];
          backendResponse.response.forEach((element) => {
            frontendResponse.push({ label: element, value: element });
          });
          return frontendResponse;
        }
        return backendResponse.response;
      })
    );
  }

  getAllBooks(
    orderBy: string | null,
    isDesc: string | null,
    bookType?: BookType | null
  ): Observable<TemplateResponse<TableAdminBookDTO[]>> {
    const body = {
      type: bookType,
      orderBy: orderBy,
      isDesc: isDesc,
    };
    return this.apiService
      .post(`${this.bookURL}/get-all-admin-books`, body)
      .pipe(
        map((backendResponse: TemplateResponse<TableAdminBookDTO[]>) => {
          let frontendResponse = backendResponse;
          frontendResponse.response.forEach((element) => {
            element.rating = element.rating / 2;
          });
          return backendResponse;
        })
      );
  }
}
