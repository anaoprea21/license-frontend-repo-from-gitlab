import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, from, switchMap, tap, throwError } from 'rxjs';
import { StorageHelper } from '../helpers/storage.helper';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthService } from '../api/auth.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private authService: AuthService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'AccessToken': `${StorageHelper.getAccessToken()}`,
      'Content-Type': 'application/json;charset=UTF-8'
    })


    const body = request.body;
    const clonedReq = request.clone({headers:headers, body: JSON.stringify(body)})

    return next.handle(clonedReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (
          !request.url.includes('/refresh-access-token') &&
           (err.error.error_message === 'ACCESS_TOKEN_INVALID'||
           err.error.error_message === 'INVALID_SESSION'||
           err.error.error_message === 'INVALID_TOKEN'
        )) {
          return from(this.reauthorise(clonedReq)).pipe(
            switchMap((request) => {
              if (request) {
                let headers = new HttpHeaders({
                  'Access-Control-Allow-Origin': '*',
                  'AccessToken': `${StorageHelper.getAccessToken()}`,
                  'Content-Type': 'application/json;charset=UTF-8'
                })
            
            
                const body = request.body;
                const clonedReq = request.clone({headers:headers, body: body})

                return next.handle(clonedReq);
              }
              return request;
            })
          );
        }
        return throwError(() => err);
      })
    );
  }

  private async reauthorise(
    request: HttpRequest<any>
  ): Promise<HttpRequest<any>> {
    const refreshToken = StorageHelper.getRefreshToken();
    if (refreshToken) {
      const newToken = (await this.authService.refreshAccessToken()).response;
      StorageHelper.saveAccessTokenLocal(newToken);

      return request;
    }

    this.logOut();
    return request;
  }


  logOut(): void {
    this.socialAuthService.signOut(true);
    StorageHelper.clearStorage();
    this.router.navigateByUrl('/auth/login');
  }
}
