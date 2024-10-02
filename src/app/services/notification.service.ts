import { Injectable } from '@angular/core';
import { Notification } from './../models/notification.model';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from './../../environments/environment';
import { HeadersService } from './headers.servive';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = "";
  
  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  send(data:any): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}`, data, {headers: this.herdersService.notification_header()}).pipe(catchError(err => { return throwError(err); }));
  } 

  register(data:any): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}`, data, {headers: this.herdersService.notification_header()}).pipe(catchError(err => { return throwError(err); }));
  } 

  resetPassword(data:any): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}`, data, {headers: this.herdersService.notification_header()}).pipe(catchError(err => { return throwError(err); }));
  }

  ableAccount(data:any): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}`, data, {headers: this.herdersService.notification_header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableAccount(data:any): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}`, data, {headers: this.herdersService.notification_header()}).pipe(catchError(err => { return throwError(err); }));
  }

  ableEntity(data:any): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}`, data, {headers: this.herdersService.notification_header()}).pipe(catchError(err => { return throwError(err); }));
  }

  disableEntity(data:any): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}`, data, {headers: this.herdersService.notification_header()}).pipe(catchError(err => { return throwError(err); }));
  }

  newOrderCompanyBNICB(data:any): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}`, data, {headers: this.herdersService.notification_header()}).pipe(catchError(err => { return throwError(err); }));
  }

  receiveOrderCompanyBNICB(data:any): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}`, data, {headers: this.herdersService.notification_header()}).pipe(catchError(err => { return throwError(err); }));
  }

  approveOrderBrokerCompany(data:any): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}`, data, {headers: this.herdersService.notification_header()}).pipe(catchError(err => { return throwError(err); }));
  }

  rejectOrderBrokerCompany(data:any): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}`, data, {headers: this.herdersService.notification_header()}).pipe(catchError(err => { return throwError(err); }));
  }


  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
