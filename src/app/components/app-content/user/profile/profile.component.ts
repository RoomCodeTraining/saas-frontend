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
import * as XLSX from 'xlsx';
import jwt_decode from "jwt-decode";

import { EditAskCertificate } from 'src/app/models/edit-ask-certificate.model';
import { OrderMakingMain } from 'src/app/models/order-making-main.model';
import { UserLogged } from 'src/app/models/user-logged-info.model';
import { HeadersService } from 'src/app/services/headers.servive';
import { Notification } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notification.service';
import { Email } from 'src/app/models/email.model';
import { EmailVariable } from 'src/app/models/email-variable.model';

import {formatDate} from '@angular/common';
import { AppService } from 'src/app/services/app-content/app.service';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  listItem: any;
  listCertificateType: any;
  listCompany: any;
  listProduct: any;
  listEntities: any;
  listEntityFirmUsers: any;
  lastOrder: any;
  lastRelationship: any;

  itemSelected: any;

  listVehicule: any;
  storeExportedData: any = [];
  getSheetHeaders: any = [];

  toast!: toastPayload;
  message:any;
  error_message: any;
  exist_error:boolean = false;
  success_message: any;
  exist_success:boolean = false;

  p: number = 1;

  formGroup!: FormGroup;
  submitted = false;
  formGroup1!: FormGroup;
  submitted1 = false;

  resetPassword = false;

  user_logged!: any;
  profil_id!:number;

  token!: any;

  submit: boolean = false;

  current_password!: string;
  password!: string;
  password_confirmation!: string;

  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    public Jarwis: JarwisService,
    public appService: AppService,
    private notificationsService: NotificationService,
    private herdersService: HeadersService,
    private route:ActivatedRoute,
    private Auth: AuthService,
    private router:Router,
    private Token: TokenService,
    private _formBuilder: FormBuilder,
    private cs: CommonService,
    private _location: Location,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      current_password: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
    });

    /** spinner starts on init */
    //this.SpinnerService.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.SpinnerService.hide();
    }, 1000);

    if (!localStorage.getItem('reload')) { 
      localStorage.setItem('reload', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('reload') 
    }    

    this.getUserLogged();

    if (this.tokenExpired(this.token)) {
      //console.log("TOKEN NOK");
      this.logout();
    } else {
      //console.log("TOKEN OK");
    }

  }

  getUserLogged(){
    this.appService.getUserProfile().subscribe((data: any) => {
      this.user_logged = data.data;
    });
  }

  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  logout() {
    this.Token.remove();
    this.Auth.changeAuthStatus(false);
    this.toast = {
      message: "Votre session a expiré !",
      title: 'Erreur',
      type: 'error',
      ic: {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
      } as GlobalConfig,
    };
    this.cs.showToast(this.toast);
    this.router.navigate(['/login']);
  }

  resetAll() {
    this.current_password = "";
    this.password = "";
    this.password_confirmation = "";
  }

  backClicked() {
    this._location.back();
  }

  onChange(event:any) {
    this.SpinnerService.show();
  }

  checkCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  checkNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  checkConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  checkPasswordValidity(value:string){
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Le mot de passe ne doit pas contenir d'espaces.";
    }
  
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "Le mot de passe doit contenir au moins un caractère majuscule !";
    }
  
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return "Le mot de passe doit contenir au moins un caractère minuscule!";
    }
  
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Le mot de passe doit contenir au moins un caractère minuscule !";
    }
  
    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) {
      return "Le mot de passe doit contenir au moins un symbole spécial(!,@,#,$,%,^,&,*,(,),...) !";
    }
  
    const isValidLength = /^.{12,999999}$/;
    if (!isValidLength.test(value)) {
      return "Le mot de passe doit comporter au moins 12 caractères !";
    }
  
    return null;
  }

  get f() { return this.formGroup.controls; }

  onSubmit() {
    this.submit = true;

    const formData:any = new FormData();

    formData.append("_method",'PUT');
    formData.append("current_password",this.current_password);
    formData.append("password",this.password);
    formData.append("password_confirmation",this.password_confirmation);

    this.Jarwis.resetUserPassword(formData).subscribe(res => {
      this.message = res;
      if(this.message.success == false){
        this.exist_error = true;
        this.error_message = this.message.message;
        this.toast = {
          message: this.message.message,
          title: 'Erreur',
          type: 'error',
          ic: {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
          } as GlobalConfig,
        };
      } else {
        this.toast = {
          message: this.message.message,
          title: 'Succès',
          type: 'success',
          ic: {
            timeOut: 2500,
            closeButton: true,
            progressBar: true,
          } as GlobalConfig,
        };
        this.submit = !this.submit;
        this.resetPassword = !this.resetPassword;
        this.cs.showToast(this.toast);
      }
    },
    (err: HttpErrorResponse) => {
      this.exist_error = true;
      this.error_message = err.error.errors;
      this.toast = {
        message: "Erreur de mise à jour",
        title: 'Erreur',
        type: 'error',
        ic: {
          timeOut: 5000,
          closeButton: true,
          progressBar: true,
        } as GlobalConfig,
      };
      this.submit = !this.submit;
      this.cs.showToast(this.toast);
    });
  }

}