import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CalendarEventService } from 'src/app/core/api/calendar-event.service';
import { UserService } from 'src/app/core/api/user.service';
import { CurrentUserService } from 'src/app/core/services/current-user.service.service';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { CreateNewEventPayload } from 'src/app/shared/interfaces/calendarEvents/CreateNewEventPayload';

@Component({
  selector: 'app-create-event-modal',
  templateUrl: './create-event-modal.component.html',
  styleUrls: ['./create-event-modal.component.scss'],
})
export class CreateEventModalComponent implements OnInit {
  @Input() eventData!: CreateNewEventPayload;
  @Input() isEditingEvent!: boolean;
  @Input() isVisible!: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();
  @Output() refreshData = new EventEmitter<void>();
  @Output() editEvent = new EventEmitter<CreateNewEventPayload>();

  loading: boolean = false;

  dateNgModel!: Date;

  validateInputs!: FormGroup;

  @Input() libraryBooks!: { uuid: string; title: string }[];

  constructor(
    private notification: NzNotificationService,
    private formBuilder: FormBuilder,
    private calendarEventService: CalendarEventService,
    private userService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.validateInputs = this.formBuilder.group({
      title: [this.eventData?.bookId ?? null, [Validators.required]],
      date: [this.eventData?.time ?? null, [Validators.required]],
      time: [
        this.eventData?.time
          ? new Date().setHours(
              this.eventData?.time.getHours(),
              this.eventData?.time.getMinutes()
            )
          : null,
        [Validators.required],
      ],
      note: [this.eventData?.description ?? null],
    });
  }

  onChange(res: Date) {
    console.log(res);
    this.dateNgModel = res;
  }

  verifyData() {
    this.loading = true;

    if (this.validateInputs.valid) {
      const newEventDate: Date = this.date?.value.setHours(
        this.time?.value.getHours(),
        this.time?.value.getMinutes()
      );
      this.dateNgModel.setHours(this.time?.value.getHours());
      this.dateNgModel.setMinutes(this.time?.value.getMinutes());

      const eventData: CreateNewEventPayload = {
        email: this.userService.getUserEmail(),
        bookId: this.title?.value,
        time: this.dateNgModel,
        description: this.note?.value,
      };

      if (this.isEditingEvent) this.editEvent.emit(eventData);
      else {
        this.createNewEvent(eventData);
      }
    } else {
      this.loading = false;

      this.title?.markAsDirty();
      this.date?.markAsDirty();
      this.time?.markAsDirty();

      this.notification.create(
        'error',
        'Error',
        'Ups! Check all fields before continuing'
      );
    }
  }

  createNewEvent(event: CreateNewEventPayload) {
    this.calendarEventService.createEvent(event).subscribe({
      next: (res) => {
        this.notification.create('success', 'Success', 'Success!');
        this.refreshData.emit();
        this.handleCancel();
      },
      error: (err) => {
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);   
        this.handleCancel();
      },
    });
  }

  handleCancel() {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  get title() {
    return this.validateInputs.get('title');
  }

  get note() {
    return this.validateInputs.get('note');
  }

  get date() {
    return this.validateInputs.get('date');
  }

  get time() {
    return this.validateInputs.get('time');
  }
}
