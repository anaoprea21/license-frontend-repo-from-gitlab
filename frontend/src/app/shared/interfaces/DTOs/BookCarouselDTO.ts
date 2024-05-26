import { AdminTableBookDTO } from './AdminTableBookDTO';

export interface BookCarouselDTO {
  rows: CarouselRow[];
  rowSize: number;
  elementsTotalNumber: number;
}

export interface CarouselRow {
  row: AdminTableBookDTO[];
}
