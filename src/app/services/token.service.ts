import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login: 'http://localhost:8000/api/login',
    signup: 'http://localhost:8000/api/signup'
  };

  authenticated!: any;
  decode_token!: any;
  user_logged_id!: any;

  constructor() { }

  handle(token:any) {
    this.set(token);
    //console.log(this.isValid());
  }

  set(token:any) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const authenticated = this.get();
    if (authenticated) {
      const payload = this.payload(authenticated);
      if (payload) {
        return true;
      }
    }
    return false;
  }

  payload(authenticated:any) {
    return authenticated;
  }

  loggedIn() {
    return this.isValid();
  }
}
