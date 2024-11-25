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
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/models/notification.model';
import { EmailVariable } from 'src/app/models/email-variable.model';
import { AppService } from 'src/app/services/app-content/app.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  listItem: any;
  listUserType: any;
  listRole: any;
  listOrganization: any;
  listEntityFirm: any;

  itemSelected: any;

  selectedImage: any;
  logofiles: any;
  logoSrc!: string;

  avatarfiles: any;
  avatarSrc!: string;

  toast!: toastPayload;
  message:any;
  error_message: any;
  exist_error:boolean = false;
  phone_error: any;
  success_message: any;
  exist_success:boolean = false;

  formGroup!: FormGroup;
  submitted = false;
  submitted2 = false;
  submitted3 = false;

  type: string = "vendeur";
  entity_product!: any;
  entity_product_id!: number;
  price_by_weight!: number;
  purchaseable_id!: number;
  weight: number = 0;
  listProduct: any;
  listSeller: any;

  user_logged!: any;
  npage!: number;
  token!: any;
  decode_token!: any;
  user_logged_id!: any;

  information!: string;
  start: number = 0;

  submit: boolean = false;

  addItem: boolean = false;  
  editItem: boolean = false;  
  itemDetail: boolean = false;  
  resetItem: boolean = false;  
  enableItem: boolean = false;  
  disableItem: boolean = false;

  activeDropdown!: any;  
  open: boolean = false;  
  addUserDropdown: boolean = false;  
  toggle!: any;  

  current_page: number=1;
  first_page_url!: string;
  from!: number;
  last_page!: number;
  last_page_url!: string;
  links!: any;
  next_page_url!: string;
  per_page!: number;
  prev_page_url!: string;
  to!: number;
  total!: number;

  permissions!: any;
  permitted: boolean = false;

  productList!: any[];
  productListSeleted: Array<{
    id: number,
    name: string,
  }> = []

  products: Array<{
    id: number,
  }> = []

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

    registerLocaleData( fr,'fr-FR' );
    //this.submit = false;

    /** spinner starts on init */
    this.SpinnerService.show();
    

    this.getUserLogged();
    this.getAllSeller();
    this.getProduct();

    this.formGroup = new FormGroup({
      entity_product: new FormControl('', [Validators.required]),
    });

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
    this.formGroup.reset();
  }

  hide_message() {
    this.exist_error = false;
    this.exist_success = false;
  }

  getUserLogged(){
    this.appService.getUserProfile().subscribe((data: any) => {
      this.user_logged = data.data;
      this.permissions = this.user_logged.permissions;
      if(this.permissions.includes("user.create")){
        this.permitted = true;
      } else {
        this.notPermission();
      }
    },
    (err: HttpErrorResponse) => {
        //console.log("API indisponible");
        this.logout();
    });
  }

  notPermission() {
    this.toast = {
      message: "Action non autorisée !",
      title: 'Attention',
      type: 'warning',
      ic: {
        timeOut: 5000,
        closeButton: true,
        progressBar: true,
      } as GlobalConfig,
    };
    this.cs.showToast(this.toast);
    this._location.back();
  }

  backClicked() {
    this._location.back();
  }

  getProduct(){
    this.appService.getAllProductToAdd().subscribe((data: any) => {
      this.listProduct = data.data;
      this.SpinnerService.hide();
    });
  }
  
  getAllSeller(){
    this.appService.getAllSeller(this.type).subscribe((data: any) => {
      this.listSeller = data.data;
    });
  }

  onChangeProduct(event:any) {
    var isPull = true;
    for( var i = 0; i < this.productListSeleted.length; i++){
      if(this.productListSeleted[i].id == event.id){
        isPull = false;
      }
    }   
    
    if(isPull){
      this.productListSeleted.push({
        id: event.id,
        name: event.name,
      })
    }
    
  }

  deleteProduct(element: any) {
    for( var i = 0; i < this.productListSeleted.length; i++){
      if(this.productListSeleted[i].id == element.id){
        this.productListSeleted.splice(i, 1);
      }
    }
  }

  onSelectAvatar(event:any) {
    this.avatarfiles = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => this.avatarSrc = reader.result as string;

    reader.readAsDataURL(this.avatarfiles);
    //console.log(this.avatarfiles);
  }

  getRoles(){
    this.appService.getProfile().subscribe((data: any) => {
      this.listRole = data.data;

      this.SpinnerService.hide();
    });
  }

  get f() { return this.formGroup.controls; }

  save(){
    this.submitted = true;
    if(this.formGroup.invalid){
      return;
    } else {
      this.submit = true;

      for( var i = 0; i < this.productListSeleted.length; i++){
        this.products.push({
          id: this.productListSeleted[i].id
        })
      }
      
      let requestData = {
        products: Object.values(this.products).map(value => value.id),
      }

      this.appService.addProduct(requestData).subscribe(res => {
        this.message = res;
        if(this.message.success == false){
          this.submit = false;
          this.error_message = this.message.message;
          this.exist_error = false;
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
          this.SpinnerService.hide();
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
          this.submit = false;
          this.addItem = !this.addItem;
          this.itemSelected = !this.itemSelected;
          this._location.back();
        }
        this.cs.showToast(this.toast);
      },
      (err: HttpErrorResponse) => {
        this.exist_error = true;
        this.error_message = err.error.errors;
        this.submit = false;
        this.toast = {
          message: err.error.error,
          title: 'Erreur',
          type: 'error',
          ic: {
            timeOut: 5000,
            closeButton: true,
            progressBar: true,
          } as GlobalConfig,
        };
        this.submit = false;
        this.SpinnerService.hide();
        this.cs.showToast(this.toast);
      })
    }
  }
}
  
    
