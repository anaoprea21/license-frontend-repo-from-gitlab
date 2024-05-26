import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from 'src/app/core/services/current-user.service.service';
import { CalendarEventDrawer } from 'src/app/shared/interfaces/calendarEvents/CalendarEventDrawer.interface';
import { CreateNewEventPayload } from 'src/app/shared/interfaces/calendarEvents/CreateNewEventPayload';

@Component({
  selector: 'app-specific-event',
  templateUrl: './specific-event.component.html',
  styleUrls: ['./specific-event.component.scss'],
})
export class SpecificEventComponent implements OnInit {
  @Input() eventData!: CalendarEventDrawer;
  @Input() isVisible!: boolean;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  isNewEventModalVisible = false;
  eventModalData!: CreateNewEventPayload;

  constructor(
    private router: Router,
    private userService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.eventModalData = {
      email: this.userService.getUserEmail(),
      bookId: this.eventData.cardData.bookId,
      description: this.eventData.drawerData.description,
      time: this.eventData.cardData.time,
    };
  }

  openEditEvent() {
    this.isNewEventModalVisible = true;
  }

  editEvent(event: CreateNewEventPayload) {
    this.eventData.cardData.time = event.time;
    this.eventData.drawerData.description = event.description;
  }

  close() {
    this.router.navigate([], {
      queryParams: {},
      replaceUrl: true,
    });

    this.isVisible = !this.isVisible;
    this.isVisibleChange.emit(this.isVisible);
  }
}
