import { BookType } from '../../enums/BookType';

export interface TableAdminBookDTO {
  author: string;
  genres: string[];
  id: string;
  picture: string;
  publisher: string;
  rating: number;
  title: string;
  type: BookType;
}
