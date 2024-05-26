import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/core/api/user.service';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { UserBookHandlingActions } from 'src/app/shared/enums/UserBookHandlingActions';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { CartBookDTO } from 'src/app/shared/interfaces/DTOs/CartBookDTO';

@Component({
  selector: 'app-book-cart-data',
  templateUrl: './book-cart-data.component.html',
  styleUrls: ['./book-cart-data.component.scss'],
})
export class BookCartDataComponent implements OnInit {
  @Input() cardBookData!: CartBookDTO;

  @Output() refreshBooks = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  removeFromCart(isMovingToWishlist: boolean) {
    let action = UserBookHandlingActions.noAction;
    if (isMovingToWishlist) action = UserBookHandlingActions.moveToWishlist;

    this.userService
      .removeBookFromCart(this.cardBookData.id, action)
      .subscribe({
        next: (res) => {
          this.notification.create('success', 'Success', 'Success!');
          this.refreshBooks.emit();
        },
        error: (err) => {
        this.notification.create('error', 'Error', err.error.message);          
          console.error(err);
        },
      });
  }

  gotToBookPage() {
    this.router.navigate(['/dashboard/book-page/', this.cardBookData.id]);
  }
}
