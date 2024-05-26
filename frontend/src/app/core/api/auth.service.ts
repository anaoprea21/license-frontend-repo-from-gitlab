import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateNewUserPayload } from 'src/app/shared/interfaces/payloads/CreateNewUserPayload';
import { LoggedInTokensDTO } from 'src/app/shared/interfaces/DTOs/LoggedInTokensDTO';
import { TemplateResponse } from 'src/app/shared/interfaces/TemplateResponse';
import { ApiService } from './api.service';
import { StorageHelper } from '../helpers/storage.helper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authURL: string = '/auth';
  constructor(private apiService: ApiService) {}

  createNewUser(
    newUserData: CreateNewUserPayload
  ): Observable<TemplateResponse<LoggedInTokensDTO>> {
    return this.apiService.post(`${this.authURL}/register`, newUserData);
  }

  userLogin(userData: CreateNewUserPayload): Observable<any> {
    return this.apiService.post(`${this.authURL}/login`, userData);
  }

  verify2FACode(obj: { email: string; code: string }): Observable<any> {
    obj.email = 'ana.oprea@yahoo.com';
    return this.apiService.post(`${this.authURL}/verify`, obj);
  }

  refreshAccessToken(): Promise<any> {
    return new Promise<TemplateResponse<any>>((resolve) => {
      this.apiService
        .post(
          `${this.authURL}/refresh-access-token`,
          {},
          { refreshToken: StorageHelper.getRefreshToken() }
        )
        .subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (err) => {
            console.error(err);
            resolveError(resolve, err.error.status);
          },
        });
    });
  }
}
function resolveError(
  resolve: (
    value: TemplateResponse<any> | PromiseLike<TemplateResponse<any>>
  ) => void,
  status: any
) {
  throw new Error('Function not implemented.');
}
