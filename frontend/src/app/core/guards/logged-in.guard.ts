import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageHelper } from '../helpers/storage.helper';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (StorageHelper.getAccessToken()) {
      this.router.navigateByUrl(`${'/dashboard'}`);
      return false;
    }

    return true;
  }
}
