import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookCardDataDTO } from 'src/app/shared/interfaces/DTOs/BookCardDataDTO';

@Component({
  selector: 'app-wishlist-book-list',
  templateUrl: './wishlist-book-list.component.html',
  styleUrls: ['./wishlist-book-list.component.scss'],
})
export class WishlistBookListComponent implements OnInit {
  @Input() books!: BookCardDataDTO[];
  @Output() refreshWishlistBooksEmitter = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  refreshWishlistBooks() {
    this.refreshWishlistBooksEmitter.emit();
  }
}
