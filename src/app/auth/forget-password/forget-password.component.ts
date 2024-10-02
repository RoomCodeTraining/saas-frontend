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
import { EditAskCertificate } from 'src/app/models/edit-ask-certificate.model';
import { EditAskMain } from 'src/app/models/edit-ask-main.model';
import { UserLogged } from 'src/app/models/user-logged-info.model';
import { UserPeople } from 'src/app/models/user-people.model';
import { HeadersService } from 'src/app/services/headers.servive';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from 'src/app/services/app-content/app.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  listItem: any;
  listEntityFirm: any;

  itemSelectionne: any;

  selectedImage: any;
  picturefiles: any;
  pictureSrc!: string;

  toast!: toastPayload;
  message:any;
  password_error_message:any;
  confirm_password_error_message:any;
  error_message: string = "";
  exist_error:boolean = false;
  success_message: string = "";
  exist_success:boolean = false;
  error_exist: boolean = false;
  password_error_exist: boolean = false;

  formGroup!: FormGroup;
  submitted = false;

  email!: string;
  password!: string;
  confirm_password!: string;
  user_username!: string;

  public error = null;

  api_error_message: any;
  api_error_exist: boolean = false;

  click: boolean = false;
  show: boolean = false;

  token!: any;
  decode_token!: any;

  submit: boolean = false;

  user_logged_email!: any;

  showNewPassword: boolean = false;
  showLastPassword: boolean = false;
  showConfirmPassword: boolean = false;

  decodedParams!: any;
  action!: any;

  emailSent: boolean = false;

  counter:number = 3600;

  expirationCounter!: string;


  constructor(
    public Jarwis: JarwisService,
    public appService: AppService,
    private herdersService: HeadersService,
    private route:ActivatedRoute,
    private Auth: AuthService,
    private router:Router,
    private Token: TokenService,
    private _formBuilder: FormBuilder,
    private cs: CommonService,
    private _location: Location,
    private SpinnerService: NgxSpinnerService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
   
    registerLocaleData( fr,'fr-FR' );

    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });

  }
  
  reset(){
    this.ngOnInit();
  }  

  itemClique(item:any) {
    this.itemSelectionne = item;
  }

  itemCliqueAble(item:any) {
    this.itemSelectionne = item;
  }

  itemCliqueDisable(item:any) {
    this.itemSelectionne = item;
  }
 
  hide_message() {
    this.exist_error = false;
    this.exist_success = false;
  }

  startTimer(secsToStart:number): void {
    var start: number = secsToStart;
    var h: number;
    var m: number;
    var s: number;
    var temp: number;
    var timer: any = setInterval(() =>
    {
      this.counter = this.counter - 1;
      h = Math.floor(start / 60 / 60)
      // remove the hours
      temp = start - h * 60 * 60;
      m = Math.floor(temp / 60);
      // remove the minuets
      temp = temp - m * 60;
      // what left is the seconds
      s = temp;

      // add leading zeros for aesthetics
      var hour = h < 10 ? "0" + h : h;
      var minute = m < 10 ? "0" + m : m;
      var second = s < 10 ? "0" + s : s;

      this.expirationCounter = hour + ":" + minute + ":" + second;

      if (start <= 0) {
          // Time elapsed
          clearInterval(timer);
          this.expirationCounter = "Expired";
          // Make here changes in gui when time elapsed
          //....
      }
      start--;
    }, 1000)
  }

  onSubmit() {
    this.submit = true;

    const formData:any = new FormData();

    formData.append("email",this.email);

    // this.Jarwis.forgotPassword(formData).subscribe(res => {
    //   this.submit = !this.submit;
    //   this.message = res;
    //   if(this.message.success == false){
    //     this.error_exist = true;
    //     this.error_message = this.message.message;
    //     this.toast = {
    //       message: this.message.message,
    //       title: 'Erreur',
    //       type: 'error',
    //       ic: {
    //         timeOut: 5000,
    //         closeButton: true,
    //         progressBar: true,
    //       } as GlobalConfig,
    //     };
    //   } else {
    //     this.submit = false;
    //     this.exist_success = true;
    //     this.success_message = this.message.message;
    //     this.toast = {
    //       message: this.message.message,
    //       title: 'Succès',
    //       type: 'success',
    //       ic: {
    //         timeOut: 2500,
    //         closeButton: true,
    //         progressBar: true,
    //       } as GlobalConfig,
    //     };
    //     this.cs.showToast(this.toast);
    //     this.emailSent = true;
    //     this.startTimer(this.counter);
    //   }
    // },
    // (err: HttpErrorResponse) => {
    //   this.submit = !this.submit;
    //   this.exist_success = false;
    //   this.api_error_exist = true;
    //   this.api_error_message = err.error.errors;
    //   this.toast = {
    //     message: "Erreur d'authentification",
    //     title: 'Erreur',
    //     type: 'error',
    //     ic: {
    //       timeOut: 5000,
    //       closeButton: true,
    //       progressBar: true,
    //     } as GlobalConfig,
    //   };
    //   this.cs.showToast(this.toast);
    // });
  }

  get f() { return this.formGroup.controls; }

}