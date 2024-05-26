import { BookType } from '../../enums/BookType';

export interface CartBookDTO {
  id: string;
  rating: number;
  title: string;
  author: string;
  bookType: BookType;
  price: number;
  picture: string;
}
