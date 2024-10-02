import { Injectable } from '@angular/core';
import { catchError, Observable,of, throwError } from 'rxjs';
import { BehaviorSubject, map, switchMap, take, tap } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { UserLogged } from '../models/user-logged-info.model';
import jwt_decode from "jwt-decode";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  token!: any;
  decode_token!: any;

  headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    // 'Content-Type': 'application/json',
    // 'Accept': 'application/json',
  });

  
  constructor(private http: HttpClient) { }

  bnicb_header(){
    return new HttpHeaders({
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
        //'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': `true`,
        'X-XSRF-TOKEN': `true`,
        'Accept': 'application/json',
      });
  }

  notification_header(){
    return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer 3|dyuLqo2fcAHLFq5BdtWu37RHsZ1XpEd6EUz3cpSv`,
      });
  }

  task_engine_header(){
    return new HttpHeaders({
      'Content-Type': 'application/json'
      });
  }

  getEntityfirmId(){
    this.token = localStorage.getItem('token')
    this.decode_token = jwt_decode(this.token);

    return this.decode_token.data.entityfirm_id;
  }

  getEntryBy(){
    this.token = localStorage.getItem('token')
    this.decode_token = jwt_decode(this.token);

    return this.decode_token.data.userpeople_id;
  }

  getUserProfileId(){
    this.token = localStorage.getItem('token')
    this.decode_token = jwt_decode(this.token);

    return this.decode_token.data.userprofile_id;
  }

  getBNICBEntityFirmId(){
    return 2;
  }

  getPoolTpvEntityFirmId(){
    return 12;
  }

  getLimit(){
    return 100000000;
  }

  
}
