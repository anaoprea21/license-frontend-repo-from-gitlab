import { BookType } from '../../enums/BookType';

export interface AdminTableBookDTO {
  id: string;
  picture: string;
  title: string;
  author: string;
  type: BookType;

  language: string;
  createdAt: Date;
  publisher: string;

  genres: string[]; 

  rating: number;
}
