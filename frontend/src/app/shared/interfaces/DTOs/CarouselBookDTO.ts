import { BookType } from '../../enums/BookType';

export interface CarouselBookDTO {
  author: string;
  id: string;
  wishListed: boolean;
  language: string;
  picture: string;
  rating: number;
  title: string;
  type: BookType;
}
