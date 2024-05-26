import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UnauthorizedInterceptor } from './interceptors/unauthorized-interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true,
    }],
  ],
})
export class CoreModule {}
