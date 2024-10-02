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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

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

  action!: any;


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

    this.route.queryParams.subscribe(params => {
      // Access query parameters
      //console.log('Raw Query Params:', params);

      // Decode specific query parameters
      const encodedParamToken = params['token']; // Replace 'your_param_name' with your actual parameter name
      if (encodedParamToken) {
        this.token = decodeURIComponent(encodedParamToken);
        //console.log('Decoded Param:', this.token);
        // Do something with the decoded parameter
      }

      const encodedParamEmail = params['email']; // Replace 'your_param_name' with your actual parameter name
      if (encodedParamEmail) {
        this.email = decodeURIComponent(encodedParamEmail);
        //console.log('Decoded Param:', this.email);
        //
      }
    });

    registerLocaleData( fr,'fr-FR' );

    this.formGroup = new FormGroup({
      //email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required]),
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

  newPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  lastPassword() {
    this.showLastPassword = !this.showLastPassword;
  }

  confirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSelectPicture(event:any) {
    this.picturefiles = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => this.pictureSrc = reader.result as string;

    reader.readAsDataURL(this.picturefiles);
    //console.log(this.picturefiles);
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

  onSubmit() {
    this.submit = true;

    const formData:any = new FormData();

    formData.append("token",this.token);
    formData.append("email",this.email);
    formData.append("password",this.password);
    formData.append("password_confirmation",this.confirm_password);

    // this.Jarwis.resetPassword(formData).subscribe(res => {
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
    //     this.submit = true;
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
    //     this.router.navigate(['/']);
    //     //this.handleResponse(res)
    //   }
    // },
    // (err: HttpErrorResponse) => {
    //   this.submit = !this.submit;
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

  handleResponse(data:any) {
    this.Token.handle(data.data.token);
    this.Auth.changeAuthStatus(true);
    this.router.navigate(['/']);
  }

  get f() { return this.formGroup.controls; }

}