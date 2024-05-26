import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateEventModalComponent } from './create-event-modal/create-event-modal.component';
import { SpecificEventComponent } from './specific-event/specific-event.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CreateEventModalComponent,
    SpecificEventComponent,
  ],
  imports: [CommonModule, CalendarRoutingModule, SharedModule],
})
export class CalendarModule {}
