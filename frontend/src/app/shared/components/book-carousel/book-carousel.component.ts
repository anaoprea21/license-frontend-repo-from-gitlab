import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AdminTableBookDTO } from '../../interfaces/DTOs/AdminTableBookDTO';
import { CarouselBookDTO } from '../../interfaces/DTOs/CarouselBookDTO';

@Component({
  selector: 'app-book-carousel',
  templateUrl: './book-carousel.component.html',
  styleUrls: ['./book-carousel.component.scss'],
})
export class BookCarouselComponent implements OnInit {
  @Input() data!: CarouselBookDTO[][];
  @Output() goToDisplayMore = new EventEmitter<void>();

  carouselTabPosition: string = 'left';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (window.innerHeight > 700) this.carouselTabPosition = 'top';
    else this.carouselTabPosition = 'left';
  }

  goToSpecificBookPage(id: string) {
    this.router.navigate([`dashboard/book-page`, id]);
  }

}
