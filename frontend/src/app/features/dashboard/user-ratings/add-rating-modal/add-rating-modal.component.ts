import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BookService } from 'src/app/core/api/book.service';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { CurrentUserService } from 'src/app/core/services/current-user.service.service';
import { AddRatingDTO } from 'src/app/shared/interfaces/DTOs/AddRatingDTO';

@Component({
  selector: 'app-add-rating-modal',
  templateUrl: './add-rating-modal.component.html',
  styleUrls: ['./add-rating-modal.component.scss'],
})
export class AddRatingModalComponent implements OnInit {
  @Input() isVisible!: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() refresh = new EventEmitter<void>();

  @Input() libraryBooks: { uuid: string; title: string }[] = [];
  
  validateInputs!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private notification: NzNotificationService,
    private currentUserSrevice:CurrentUserService
  ) {}

  ngOnInit(): void {
    this.validateInputs = this.formBuilder.group({
      title: [null, [Validators.required]],
      text: [null, [Validators.required]],
      rating: [null, [Validators.required]],
    });
  }

  handleCancel() {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  verifyData() {
    if (this.rating?.valid && this.text?.valid) {
      const token = StorageHelper.getAccessToken();
      if (token) {
        const newRating: AddRatingDTO = {
          bookId: this.title?.value,
          rating: this.rating?.value*2,
          text: this.text?.value,
          email: this.currentUserSrevice.getUserEmail(),
        };
        this.bookService.addBookRatings(newRating).subscribe({
          next: (res) => {
            this.notification.create('success', 'Success', 'Success!');
            this.refresh.emit();
            this.handleCancel();
          },
        });
      }
    }
  }

  get text() {
    return this.validateInputs.get('text');
  }

  get title() {
    return this.validateInputs.get('title');
  }

  get rating() {
    return this.validateInputs.get('rating');
  }
}
