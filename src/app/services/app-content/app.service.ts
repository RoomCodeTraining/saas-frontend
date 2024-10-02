import { Injectable } from '@angular/core';
import { catchError, Observable,of, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { TokenService } from '../token.service';
import { environment } from '../../../environments/environment';
import { HeadersService } from '../headers.servive';
import * as dayjs from 'dayjs'
import * as customParseFormat from 'dayjs/plugin/customParseFormat'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = environment.api_url;

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  });
  
  constructor(private http: HttpClient,
              private Token: TokenService,
              private herdersService: HeadersService) { }

  getUserProfile(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl + '/auth/user',{headers: this.headers}).pipe(catchError(err => {
      return throwError(err);
    }));
              }

  getEntityType(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/types`,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllEntity(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}`,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntity(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}`,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntityPaginate(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}`,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntitySearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&search=` + information,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getEntityPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/entities?page=${page}` +`&search=` + information,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  addEntity(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, data,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  updateEntity(data:any,user_id:string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/`+ user_id, data,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  enableEntity(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/`+ user_id +`/enable`, data,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  disableEntity(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/`+ user_id +`/disable`,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }


  getRole(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/roles`,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllUser(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}`,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllUserPaginate(page:number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}`,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllUserSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}` +`&search=` + information,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getAllUserPaginateSearch(page:number,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}` +`&search=` + information,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getUser(page:number,role:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&role=`+ role,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserPaginate(page:number,role:string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&role=`+ role,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserSearch(page:number,role:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&role=`+ role +`&search=` + information,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getUserPaginateSearch(page:number,role:string,information:any): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?page=${page}&role=`+ role +`&search=` + information,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  addUser(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, data,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  updateUser(data:any,user_id:string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/`+ user_id, data,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  sendWelcome(data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/welcome/send-welcome`, data,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  enableUser(user_id:string,data:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/`+ user_id +`/enable`, data,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  disableUser(user_id:string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/`+ user_id +`/disable`,{headers: this.headers}).pipe(catchError(err => { return throwError(err); }));
  }

  getanyProfile(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl + '/auth/user',{headers: this.headers}).pipe(catchError(err => {
      return throwError(err);
    }));
  }

  errorHandler<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      //console.log(error); // pour afficher dans la console
      //console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }
}
