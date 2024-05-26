import { BookType } from '../../enums/BookType';

export interface AdminManageBookDTO {
  id: string;
  title: string;
  author: string;
  language: string;
  publisher: string;
  bookType: BookType;
  bookCategories: string[];
  price: number;
  size: number;
  description: string;
  picture: string;
  filePath: string;
  rating?: number;
}
