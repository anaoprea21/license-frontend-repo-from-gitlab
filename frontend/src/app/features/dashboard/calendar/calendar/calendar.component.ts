import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CalendarEventService } from 'src/app/core/api/calendar-event.service';
import { UserService } from 'src/app/core/api/user.service';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { CalendarEventCardDTO } from 'src/app/shared/interfaces/calendarEvents/CalendarEventCardDTO';
import { CalendarEventDrawer } from 'src/app/shared/interfaces/calendarEvents/CalendarEventDrawer.interface';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  isConfirmModalVisible: boolean = false;
  isNewEventModalVisible: boolean = false;
  isEventDrawerVisible: boolean = false;

  eventDrawerData!: CalendarEventDrawer;
  eventDrawerId!: string;

  eventToBeDeletedId!: string;

  libraryBooks: { uuid: string; title: string }[] = [];

  calendarEvents!: CalendarEventCardDTO[];

  constructor(
    private calendarEventService: CalendarEventService,
    private notification: NzNotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.calendarEventService.getUserEvents().subscribe({
      next: (res) => {
        this.calendarEvents = res.response;
      },
      error: (err) => {
        this.calendarEvents = [];
        console.error(err);
        this.notification.create('error', 'Error', err.error.message);   
      },
    });
  }

  confirmEventRemoval(eventId: string) {
    this.eventToBeDeletedId = eventId;
    this.isConfirmModalVisible = true;
  }

  changeConfirmDeleteVisibility(isSure?: boolean) {
    if (isSure) {
      const index = this.calendarEvents.findIndex(
        (event) => event.id === this.eventToBeDeletedId
      );

      this.calendarEventService
        .deleteEvent(this.calendarEvents[index].id)
        .subscribe({
          next: (res) => {
            this.notification.create(
              'success',
              'Success',
              'Event deleted successfully!'
            );
            this.getEvents();
          },
          error: (err) => {
            console.error(err);
            const message =
              Object.entries(NotifText).find(([key, val]) => {
                key === err.error.messsage;
                return val;
              })?.[1] ?? err.error.message;
            this.notification.create('error', 'Error', message);
          },
        });
    }
    this.isConfirmModalVisible = false;
  }

  makeNewEventModalVisible() {
    this.userService.getLibraryBooksNames().subscribe({
      next: (res) => {
        this.libraryBooks = res.response;
        this.isNewEventModalVisible = true;
      },
      error: (err) => {
        this.isNewEventModalVisible = true;
      },
    });
  }
}
