import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/core/api/user.service';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { BookCardDataDTO } from '../../interfaces/DTOs/BookCardDataDTO';
import { UserBookHandlingActions } from '../../enums/UserBookHandlingActions';
import { NotifText } from '../../enums/notif.text';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  @Input() isHeartDisplayed: boolean = false;
  @Input() isLibraryCard: boolean = false;
  @Input() isWishListCard: boolean = false;
  @Input() cardBookData!: BookCardDataDTO;

  @Output() refreshWishlistBooks = new EventEmitter<void>();

  isHeartFull: boolean = false;

  constructor(
    private router: Router,
    private notification: NzNotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  makingHeartVisible() {
    this.isHeartFull = !this.isHeartFull;
  }

  addToWishlist() {
    this.userService.addBookToWishlist(this.cardBookData.id).subscribe({
      next: (res) => {
        this.cardBookData.wishListed = true;
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);   
      },
    });
  }

  removeBookFromWishlist() {
    this.userService.removeBookFromWishlist(this.cardBookData.id).subscribe({
      next: (res) => {
        this.cardBookData.wishListed = false;
        if (this.isWishListCard) this.refreshWishlistBooks.emit();
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);   
      },
    });
  }

  addToCart() {
    this.userService
      .addBookToCart(
        this.cardBookData.id,
        UserBookHandlingActions.removeToWishlist
      )
      .subscribe({
        next: (res) => {
          this.notification.create('success', 'Success', 'Success!');
          if (this.isWishListCard) this.refreshWishlistBooks.emit();
        },
        error: (err) => {
          console.error(err);
          this.notification.create('error', 'Error', err.error.message);
        },
      });
  }

  goToLibraryBook() {
    if (this.isLibraryCard)
      this.router.navigate(['/dashboard/library/', this.cardBookData.id]);
    else this.router.navigate(['/dashboard/book-page/', this.cardBookData.id]);
  }
}
