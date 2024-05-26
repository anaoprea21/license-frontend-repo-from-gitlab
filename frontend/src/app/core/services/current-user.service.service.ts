import { Injectable } from '@angular/core';
import { TokenClaims } from 'src/app/shared/interfaces/TokenClaims';
import { UserRole } from 'src/app/shared/interfaces/UserRole';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private userRole!: UserRole;
  private userEmail!: string;
  constructor() {}

  getUserRole() {
    return this.userRole;
  }

  getUserEmail() {
    return this.userEmail;
  }

  setCurrentUserTokenClaims(token: TokenClaims) {
    this.userEmail = token.sub;
    this.userRole = token.role;
  }
}
