import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenClaims } from 'src/app/shared/interfaces/TokenClaims';
import { StorageHelper } from '../helpers/storage.helper';
import { CurrentUserService } from '../services/current-user.service.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: CurrentUserService
  ) {}

  canActivate(): boolean {
    if (!StorageHelper.getAccessToken()) {
      this.router.navigateByUrl(`${'/auth/login'}`);
      return false;
    }
    const decodedToken: TokenClaims = jwt_decode(
      StorageHelper.getAccessToken() as string
    );
    this.userService.setCurrentUserTokenClaims(decodedToken);

    return true;
  }
}
