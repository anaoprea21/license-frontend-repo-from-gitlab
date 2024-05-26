import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserRole } from 'src/app/shared/interfaces/UserRole';
import { CurrentUserService } from '../services/current-user.service.service';
import { TokenClaims } from 'src/app/shared/interfaces/TokenClaims';
import jwt_decode from 'jwt-decode';
import { StorageHelper } from '../helpers/storage.helper';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: CurrentUserService
  ) {}

  canActivate(): boolean {
    const decodedToken: TokenClaims = jwt_decode(
      StorageHelper.getAccessToken() as string
    );
    this.userService.setCurrentUserTokenClaims(decodedToken);
    
    if (this.userService.getUserRole() === UserRole.user) {
      this.router.navigateByUrl(`${'/dashboard'}`);
      return false;
    }

    return true;
  }
}
