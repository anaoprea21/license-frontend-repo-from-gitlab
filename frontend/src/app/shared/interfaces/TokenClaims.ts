import { UserRole } from './UserRole';

export interface TokenClaims {
  sub: string;
  role: UserRole;
}
