import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/core/api/user.service';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { CartBookDTO } from 'src/app/shared/interfaces/DTOs/CartBookDTO';

@Component({
  selector: 'app-cart-book-list',
  templateUrl: './cart-book-list.component.html',
  styleUrls: ['./cart-book-list.component.scss'],
})
export class CartBookListComponent implements OnInit {
  @Input() cartBooks!: CartBookDTO[];

  @Output() refreshCartBooks = new EventEmitter<void>();

  booksTotal!: string;
  isCardDataModalVisible = false;

  validateInputs!: FormGroup;
  cardNumber = '';
  expDate = '';
  cardCode = '';

  dayOptions = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    10,
    11,
    12,
  ];

  monthOptions = [
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  ];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    let total = 0;
    this.cartBooks.forEach((element) => {
      total += element.price;
    });

    this.booksTotal = parseFloat(total.toString()).toFixed(2);
  }

  refreshBooks() {
    this.refreshCartBooks.emit();
  }

  purchaseBooks() {
    let bookIds: string[] = [];
    this.cartBooks.forEach((element) => {
      bookIds.push(element.id);
    });
    this.userService.addBookToLibrary(bookIds).subscribe({
      next: (res) => {
        this.notification.create('success', 'Success', 'Success!');
        this.handleCancel();
        this.refreshBooks();
      },
      error: (err) => {
        const message =
        Object.entries(NotifText).find(([key, val]) => {
          key === err.error.messsage;
          return val;
        })?.[1] ?? err.error.message;
      this.notification.create('error', 'Error', message);
        console.error(err);
      },
    });
  }

  openModal() {
    this.validateInputs = this.formBuilder.group({
      cardNumberForm: ['', [Validators.required, Validators.minLength(16)]],
      expDateDayForm: ['01', [Validators.required]],
      expDateMonthForm: [23, [Validators.required]],
      codeForm: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.isCardDataModalVisible = true;
  }

  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  @ViewChild('inputElement3', { static: false }) inputElement3?: ElementRef;

  onChange(value: string, inputType: string): void {
    this.updateValue(value, inputType);
  }

  onBlur(inputType: string): void {
    if (
      inputType === 'cardNumber' &&
      (this.cardNumber.charAt(this.cardNumber.length - 1) === '.' ||
        this.cardNumber === '-')
    ) {
      this.updateValue(this.cardNumber.slice(0, -1), inputType);
    }
    if (
      inputType === 'cardCode' &&
      (this.cardCode.charAt(this.cardCode.length - 1) === '.' ||
        this.cardCode === '-')
    ) {
      this.updateValue(this.cardCode.slice(0, -1), inputType);
    }
  }

  updateValue(value: string, inputType: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      if (inputType === 'cardNumber') this.cardNumber = value;
      if (inputType === 'cardCode') this.cardCode = value;
    }
    if (inputType === 'cardNumber')
      this.inputElement!.nativeElement.value = this.cardNumber;
    if (inputType === 'cardCode')
      this.inputElement3!.nativeElement.value = this.cardCode;
  }

  verifyData() {
    if (
      (this.cardNumberForm?.valid,
      this.expDateDayForm?.valid,
      this.expDateMonthForm?.valid,
      this.codeForm?.valid)
    ) {
      this.purchaseBooks();
    }
  }

  handleCancel() {
    this.isCardDataModalVisible = false;
  }

  get expDateDayForm() {
    return this.validateInputs.get('expDateDayForm');
  }

  get expDateMonthForm() {
    return this.validateInputs.get('expDateMonthForm');
  }

  get cardNumberForm() {
    return this.validateInputs.get('cardNumberForm');
  }

  get codeForm() {
    return this.validateInputs.get('codeForm');
  }
}
