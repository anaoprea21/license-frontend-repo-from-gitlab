import { UserBookHandlingActions } from '../../enums/UserBookHandlingActions';

export interface HandleUserBookPayload {
  email: string;
  bookIds: string[];
  action: UserBookHandlingActions;
}
