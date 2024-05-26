import { BookType } from '../../enums/BookType';

export interface GetCarouselBooks {
  email: string;
  type: string; //recommended, new, popular
  page: number;
  pageSize: number;
}
