import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject <boolean>(this.Token.loggedIn())
  authStatus = this.loggedIn.asObservable();

  constructor(private Token: TokenService,
              private http: HttpClient) { }

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  

  
}
