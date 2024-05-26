import { BookType } from '../../enums/BookType';

export interface GetBooksByGenrePayload {
  email: string;
  genre: string[];
  type: BookType;
  page: number;
  pageSize: number;
  totalCount: number;
}
