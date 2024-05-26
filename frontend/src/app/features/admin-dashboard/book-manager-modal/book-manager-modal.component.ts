import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AdminBookService } from 'src/app/core/api/admin.book.service';
import { BookType } from '../../../shared/enums/BookType';
import { AdminManageBookDTO } from '../../../shared/interfaces/DTOs/AdminManageBookDTO';
import { NotifText } from 'src/app/shared/enums/notif.text';

enum modalTitle {
  editing = 'Editing book',
  creating = 'Create a book',
}

@Component({
  selector: 'app-book-manager-modal',
  templateUrl: './book-manager-modal.component.html',
  styleUrls: ['./book-manager-modal.component.scss'],
})
export class BookManagerModalComponent implements OnInit {
  @Input() isVisible!: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() refreshTableData = new EventEmitter<void>();

  @Input() isEditing!: boolean;
  @Input() bookData!: AdminManageBookDTO;
  loading: boolean = false;

  validateInputs!: FormGroup;

  modalTitle = modalTitle;
  bookTypes = BookType;
  selectBookTypes = Object.values;

  uploadedPictureBase64?: string;
  isUploadedPictureBase64: boolean = false;

  bookGenreOptions: { value: string; label: string }[] = [];
  isBookGenreOptionsSelectDisabled: boolean = false;

  filePath!: string;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private bookService: AdminBookService
  ) {}

  ngOnInit(): void {
    this.getBookGenres();
    this.addForm();
  }

  getBookGenres() {
    this.bookService.getAllBookGenres(true).subscribe({
      next: (res) => {
        this.bookGenreOptions = res;
      },
      error: (err) => {
        console.error(err);
        this.isBookGenreOptionsSelectDisabled = true;
      },
    });
  }

  addForm() {
    this.validateInputs = this.formBuilder.group({
      title: [this.bookData?.title ?? null, [Validators.required]],
      author: [this.bookData?.author ?? null, [Validators.required]],
      publisher: [this.bookData?.publisher ?? null, [Validators.required]],
      language: [this.bookData?.language ?? null, [Validators.required]],
      bookType: [
        this.bookData?.bookType ?? this.bookTypes.AUDIO,
        [Validators.required],
      ],
      bookGenre: [this.bookData?.bookCategories ?? null, [Validators.required]],
      price: [this.bookData?.price ?? 0, [Validators.required]],
      size: [this.bookData?.size ?? 0, [Validators.required]],
      description: [this.bookData?.description ?? null, [Validators.required]],
      picture: [null, [Validators.required]],
    });
    this.uploadedPictureBase64 = this.bookData?.picture;
  }

  uploadBookFile(value: any) {
    this.filePath = value.target.files[0].name;
  }

  async uploadMediaPicture(value: any) {
    const file: File = value.target.files[0];

    await this.getBase64(file);
    this.isUploadedPictureBase64 = true;
  }

  getBase64 = async (file: File): Promise<void> => {
    this.uploadedPictureBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(
          reader.result?.slice(23, (reader.result as string).length) as string
        );
      reader.onerror = (error) => reject(error);
    });
  };

  verifyData() {
    this.loading = true;

    if (
      this.uploadedPictureBase64 &&
      this.description?.valid &&
      this.price?.valid &&
      this.size?.valid &&
      this.title?.valid &&
      this.author?.valid &&
      this.publisher?.valid &&
      this.language?.valid &&
      this.bookType?.valid &&
      this.bookGenre?.valid
    ) {
      const book: AdminManageBookDTO = {
        id: this.bookData?.id,
        description: this.description?.value,
        price: parseInt(this.price?.value),
        size: parseInt(this.size?.value),
        title: this.title?.value,
        author: this.author?.value,
        publisher: this.publisher?.value,
        language: this.language?.value,
        bookType: this.bookType?.value,
        picture: this.uploadedPictureBase64,
        bookCategories: this.bookGenre?.value,
        filePath: this.filePath,
      };

      if (this.isEditing) {
        this.editBook(book);
      } else {
        this.createBook(book);
      }
    } else {
      this.loading = false;

      this.price?.markAsDirty();
      this.description?.markAsDirty();
      this.size?.markAsDirty();
      this.title?.markAsDirty();
      this.author?.markAsDirty();
      this.publisher?.markAsDirty();
      this.bookType?.markAsDirty();
      this.language?.markAsDirty();
      this.bookGenre?.markAsDirty();

      this.notification.create(
        'error',
        'Error',
        'Ups! Check all fields before creating'
      );
    }
  }

  addItemToDropdown(input: HTMLInputElement) {
    this.bookGenreOptions.push({ label: input.value, value: input.value });
  }

  editBook(book: AdminManageBookDTO) {
    this.bookService.editBook(book).subscribe({
      next: () => {
        this.notification.create(
          'success',
          'Success',
          'Book edited successfully! ;)'
        );
        this.refreshTableData.emit();
        this.loading = false;
        this.handleCancel();
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);
        this.loading = false;
      },
    });
  }

  createBook(book: AdminManageBookDTO) {
    this.bookService.createBook(book).subscribe({
      next: () => {
        this.notification.create(
          'success',
          'Success',
          'Book created successfully! ;)'
        );
        this.refreshTableData.emit();
        this.handleCancel();
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);
        this.loading = false;
      },
    });
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  get title() {
    return this.validateInputs.get('title');
  }

  get author() {
    return this.validateInputs.get('author');
  }

  get publisher() {
    return this.validateInputs.get('publisher');
  }

  get language() {
    return this.validateInputs.get('language');
  }

  get bookType() {
    return this.validateInputs.get('bookType');
  }

  get bookGenre() {
    return this.validateInputs.get('bookGenre');
  }

  get price() {
    return this.validateInputs.get('price');
  }

  get size() {
    return this.validateInputs.get('size');
  }

  get description() {
    return this.validateInputs.get('description');
  }
}
