import { Injectable } from '@angular/core';
import { CarouselBooksArray } from 'src/app/shared/interfaces/carouselBooksArrays';
import { AdminTableBookDTO } from 'src/app/shared/interfaces/DTOs/AdminTableBookDTO';
import { CarouselBookDTO } from 'src/app/shared/interfaces/DTOs/CarouselBookDTO';

@Injectable({
  providedIn: 'root',
})
export class MappingHelper {
  mapCarouselBooks(unmappedBooks: CarouselBookDTO[], arraySize:number): CarouselBookDTO[][] {
    // let mappedBooks: CarouselBooksArray[] = [];
    return unmappedBooks.reduce((batches, curr, i) => {
        if (i % arraySize === 0) batches.push([]);
        batches[batches.length - 1].push(unmappedBooks[i]);
        return batches;
    }, [] as any[][]);
  }
}
