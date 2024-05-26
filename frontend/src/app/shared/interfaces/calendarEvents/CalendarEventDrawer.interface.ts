import { CalendarEventCardDTO } from "./CalendarEventCardDTO";

export interface CalendarEventDrawer{
    cardData: CalendarEventCardDTO;
    drawerData: {
        description:string;
    }
}