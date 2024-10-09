import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable,of, throwError } from 'rxjs';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UserPeople } from '../models/user-people.model';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  private baseUrl = environment.api_url;
  private bnicb_url = "";

  public user$ = new BehaviorSubject<UserPeople | null>(null);

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Credentials': `true`,
  });

  bnicb_headers = new HttpHeaders({
    'X-Api-Key': "",
  });

  constructor(private http: HttpClient,
              private Token: TokenService,
              private router: Router,
              private cookieService: CookieService
              ) { }

  login(data:any) {
    return this.http.post(`${this.baseUrl}/auth/login`, data).pipe(catchError(err => {
        return throwError(err);
    }));
  }

  sendOtp(data:any) {
    return this.http.post(`${this.baseUrl}/auth/otp-validate`, data).pipe(catchError(err => {
        return throwError(err);
    }));
  }

  resendOtp(data:any) {
    return this.http.post(`${this.baseUrl}/auth/otp-resend`, data).pipe(catchError(err => {
        return throwError(err);
    }));
  }

  resetUserPassword(data:any) {
    return this.http.post(`${this.baseUrl}/user/password`, data).pipe(catchError(err => {
        return throwError(err);
    }));
  }

  setPassword(url:string,data:any) {
    // return this.getCsrfToken().pipe(
    //   switchMap(() =>
    //     this.http
    //       .post(url, data)
    //       .pipe(take(1))
    //   )
    // );
  }

  logout(data:any) {
    return this.http.post(`${this.baseUrl}/logout`, data).pipe(catchError(err => {
        return throwError(err);
    }));
  }

  forgotPassword(data:any) {
    // return this.getCsrfToken().pipe(
    //   switchMap(() =>
    //     this.http
    //       .post(`${this.baseUrl}/auth/forgot-password`, data)
    //       .pipe(take(1))
    //   )
    // );
  }

  resetPassword(data:any) {
    // return this.getCsrfToken().pipe(
    //   switchMap(() =>
    //     this.http
    //       .post(`${this.baseUrl}/auth/reset-password`, data)
    //       .pipe(take(1))
    //   )
    // );
  }

}
