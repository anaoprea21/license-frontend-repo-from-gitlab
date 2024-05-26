export interface CalendarEventCardDTO {
  id: string;
  bookId: string;
  bookTitle: string;
  bookCover: string;
  time: Date;
  day: string;
  timeLeft: string; // unix time since last epoch - enum with messages depending on time left
}
