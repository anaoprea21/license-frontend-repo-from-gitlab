import { BookType } from '../../enums/BookType';

export interface PageableBooksPayload {
  pageSize: number;
  pageNumber: number;
  bookGenre: string;
  bookType?: BookType;
}
