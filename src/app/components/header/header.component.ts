import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { GlobalConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { NgxSpinnerService } from "ngx-spinner"; 
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { AccessService } from 'src/app/services/access.service';
import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import { HeadersService } from 'src/app/services/headers.servive';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app-content/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user_logged_name!: any;
  user_logged_email!: any;
  user_logged_entityfirm_name!: any;

  toast!: toastPayload;
  message:any;
  error_message: any;
  exist_error:boolean = false;
  success_message: any;
  exist_success:boolean = false;

  user_logged!: any;
  userprofile_id!:number;

  token!: any;
  decode_token!: any;
  user_logged_id!: any;
  user_logged_profile_name!: any;

  open = false;

  constructor(
    public appService: AppService,
    public Jarwis: JarwisService,
    private cookieService: CookieService,
    private route:ActivatedRoute,
    private Auth: AuthService,
    private router:Router,
    private Token: TokenService,
    private headers: HeadersService,
    private _formBuilder: FormBuilder,
    private cs: CommonService,
    private _location: Location,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
      this.getUserLogged();
  }

  getUserLogged(){

    this.appService.getUserProfile().subscribe((data: any) => {
      this.user_logged = data.data;
        this.userprofile_id = this.user_logged.profile.id; 
    },
    (err: HttpErrorResponse) => {
        //console.log("API indisponible");
        this.logout_();
    });
  }

  logout_() {
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.router.navigate(['/login']);
  }

  logout() {
    this.SpinnerService.show();
    this.Jarwis.logout("").subscribe(res => {
      this.toast = {
        message: "Déconnecté(s) avec succès",
        title: 'Information',
        type: 'info',
        ic: {
          timeOut: 2500,
          closeButton: true,
          progressBar: true,
        } as GlobalConfig,
      };
      this.Token.remove();
      this.SpinnerService.hide();
      this.router.navigate(['/login']);
      this.cs.showToast(this.toast);
    },
    (err: HttpErrorResponse) => {
      this.toast = {
        message: err.error?.errors[0]?.detail,
        title: 'Erreur',
        type: 'error',
        ic: {
          timeOut: 5000,
          closeButton: true,
          progressBar: true,
        } as GlobalConfig,
      };
      this.SpinnerService.hide();
      this.cs.showToast(this.toast);
    });
    // this.toast = {
    //   message: this.message.message,
    //   title: 'Succès',
    //   type: 'success',
    //   ic: {
    //     timeOut: 2500,
    //     closeButton: true,
    //     progressBar: true,
    //   } as GlobalConfig,
    // };
    // this.Token.remove();
    // this.SpinnerService.hide();
    // this.router.navigate(['/login']);
    // this.cs.showToast(this.toast);
  }

  // logout() {
  //   this.SpinnerService.show();
  //   this.Jarwis.logout("").toPromise().then(
  //     res => {
  //       this.toast = {
  //         message: "DDDDDD",
  //         title: 'Succès',
  //         type: 'success',
  //         ic: {
  //           timeOut: 2500,
  //           closeButton: true,
  //           progressBar: true,
  //         } as GlobalConfig,
  //       };
  //       console.log("YYYYYYYY");
  //       this.Token.remove();
  //       this.SpinnerService.hide();
  //       this.router.navigate(['/login']);
  //       this.cs.showToast(this.toast);
  //     },
  //     (err: HttpErrorResponse) => {
  //       this.toast = {
  //         message: err.error?.errors[0]?.detail,
  //         title: 'Erreur',
  //         type: 'error',
  //         ic: {
  //           timeOut: 5000,
  //           closeButton: true,
  //           progressBar: true,
  //         } as GlobalConfig,
  //       };
  //       console.log("XXXXXXXXXX");

  //       this.Token.remove();
  //       this.SpinnerService.hide();
  //       this.router.navigate(['/login']);

  //       this.SpinnerService.hide();
  //       this.cs.showToast(this.toast);
  //     }
  //   );
  // }


  onOpen(){
    if(!this.open){
      this.open = true;
    } else {
      this.open = false;
    }
  }

  sidebarToggle(){
    (window as any).Alpine.store('app').toggleSidebar();
  }

}
