import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private headerName = 'X-XSRF-TOKEN';

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) {}

  

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.get('XSRF-TOKEN');

    if (token && !request.headers.has(this.headerName)) {
      request = request.clone({
        headers: request.headers.set(this.headerName, token),
      });
    }

    return next.handle(request.clone({ withCredentials: true }));
    // .pipe(catchError((x) => this.handleAuthError(x))); // Was being  used to handle unauthorized, if user deleted cookies.
  }
}
