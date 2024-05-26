import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TemplateResponse } from 'src/app/shared/interfaces/TemplateResponse';
import { CalendarEventCardDTO } from 'src/app/shared/interfaces/calendarEvents/CalendarEventCardDTO';
import { CalendarEventDrawer } from 'src/app/shared/interfaces/calendarEvents/CalendarEventDrawer.interface';
import { CreateNewEventPayload } from 'src/app/shared/interfaces/calendarEvents/CreateNewEventPayload';
import { CurrentUserService } from '../services/current-user.service.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CalendarEventService {
  private calendarEventURL: string = '/calendar-event';
  constructor(
    private apiService: ApiService,
    private currentUserService: CurrentUserService
  ) {}

  private getDayOfTheWeek(number: number) {
    if (number === 0) {
      return 'Mon';
    }
    if (number === 1) {
      return 'Tue';
    }
    if (number === 2) {
      return 'Wed';
    }
    if (number === 3) {
      return 'Thur';
    }
    if (number === 4) {
      return 'Fri';
    }
    if (number === 5) {
      return 'Sat';
    }
    return 'Sun';
  }
  private getTimeLeft(date: Date) {
    const currDate: Date = new Date();
    if (date.getFullYear() > currDate.getFullYear()) {
      const months = 12 - currDate.getMonth() + date.getMonth();
      if (months > 1) return 'There are ' + months + ' months left';
      return 'There is one month left';
    }

    if (date.getMonth() > currDate.getMonth()) {
      const months = date.getMonth() - currDate.getMonth();
      if (months > 1) return 'There are ' + months + ' months left';
      return 'There is one month left';
    }

    if (date.getDate() > currDate.getDate()) {
      const days = date.getDate() - currDate.getDate();
      if (days > 1) return 'There are ' + days + ' days left';
      return 'There is one day left';
    }

    return 'Less than a day left';
  }

  getUserEvents(): Observable<TemplateResponse<CalendarEventCardDTO[]>> {
    return this.apiService
      .post(
        `${
          this.calendarEventURL
        }/get-user-events/${this.currentUserService.getUserEmail()}`
      )
      .pipe(
        map((backend) => {
          let frontend: TemplateResponse<CalendarEventCardDTO[]> = backend;
          frontend.response.forEach((element) => {
            const date = element.time;
            const dt = new Date(date);
            element.timeLeft = this.getTimeLeft(dt);
            element.day = this.getDayOfTheWeek(dt.getDay());
          });
          return frontend;
        })
      );
  }

  getEvent(id: string): Observable<CalendarEventDrawer> {
    return this.apiService.get(`${this.calendarEventURL}/get-event/${id}`).pipe(
      map(
        (
          backendResponse: TemplateResponse<{
            id: string;
            bookId: string;
            bookTitle: string;
            bookCover: string;
            time: Date;
            description: string;
          }>
        ) => {
          const date = backendResponse.response.time;
          const dt = new Date(date);
          const frontendResponse: CalendarEventDrawer = {
            cardData: {
              bookCover: backendResponse.response.bookCover,
              bookId: backendResponse.response.bookId,
              bookTitle: backendResponse.response.bookTitle,
              time: backendResponse.response.time,
              day: 'sdfsa',
              id: backendResponse.response.id,
              timeLeft: 'No problem',
            },
            drawerData: {
              description: backendResponse.response.description,
            },
          };

          return frontendResponse;
        }
      )
    );
  }

  createEvent(newEventData: CreateNewEventPayload): Observable<any> {
    return this.apiService.post(
      `${this.calendarEventURL}/add-event`,
      newEventData
    );
  }

  deleteEvent(id: string): Observable<any> {
    return this.apiService.delete(
      `${this.calendarEventURL}/delete-event/${id}`
    );
  }
}
