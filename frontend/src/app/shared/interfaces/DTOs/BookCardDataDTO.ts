import { BookType } from '../../enums/BookType';

export interface BookCardDataDTO {
  id: string;
  title: string;
  picture: string;
  bookType: BookType;
  price: number;
  wishListed:boolean;
}
