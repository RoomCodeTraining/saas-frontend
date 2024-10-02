import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { HeadersService } from './headers.servive';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  token!: any;
  decode_token!: any;
  user_logged_profil_id!: number;

  constructor(private herdersService: HeadersService) { }

  handle(profil_id:any) {
    this.set(profil_id);
  }

  set(profil_id:any) {
    localStorage.setItem('profil_id', profil_id);
  }

  get() {
    return localStorage.getItem('profil_id');
  }

  remove() {
    localStorage.removeItem('profil_id');
  }


  admin() {
    this.user_logged_profil_id = this.herdersService.getUserProfileId();
    if (this.user_logged_profil_id == 11 || this.user_logged_profil_id == 12) {
        return true;
    }
    return false;
  }

  brokerResponsible() {
    this.user_logged_profil_id = this.herdersService.getUserProfileId();
    if (this.user_logged_profil_id == 17) {
        return true;
    }
    return false;
  }

  networkResponsible() {
    this.user_logged_profil_id = this.herdersService.getUserProfileId();
    if (this.user_logged_profil_id == 22) {
        return true;
    }
    return false;
  }

  stockResponsible() {
    this.user_logged_profil_id = this.herdersService.getUserProfileId();
    if (this.user_logged_profil_id == 9) {
        return true;
    }
    return false;
  }

  productionResponsible() {
    this.user_logged_profil_id = this.herdersService.getUserProfileId();
    if (this.user_logged_profil_id == 21) {
        return true;
    }
    return false;
  }

  accountant() {
    this.user_logged_profil_id = this.herdersService.getUserProfileId();
    if (this.user_logged_profil_id == 20) {
        return true;
    }
    return false;
  }

  superProductor() {
    this.user_logged_profil_id = this.herdersService.getUserProfileId();
    if (this.user_logged_profil_id == 25) {
        return true;
    }
    return false;
  }

  productor() {
    this.user_logged_profil_id = this.herdersService.getUserProfileId();
    if (this.user_logged_profil_id == 26) {
        return true;
    }
    return false;
  }
  
}
