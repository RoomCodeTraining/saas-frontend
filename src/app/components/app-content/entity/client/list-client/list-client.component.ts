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
import { UserPeople } from 'src/app/models/user-people.model';
import { HeadersService } from 'src/app/services/headers.servive';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/models/notification.model';
import { EmailVariable } from 'src/app/models/email-variable.model';
import { EntityFirm } from 'src/app/models/entity-firm.model';
import { AppService } from 'src/app/services/app-content/app.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  listItem: any;
  listEntityType: any;
  listRole: any;
  listProduct: any;
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
  exist_phone_error:boolean = false;
  phone_error: any;
  success_message: any;
  exist_success:boolean = false;
  logoError:boolean = false;
  logoErrorMessage: any;

  formGroup!: FormGroup;
  formGroupAdd!: FormGroup;
  formGroupEdit!: FormGroup;
  formGroup2!: FormGroup;
  submitted = false;
  submitted2 = false;
  submitted3 = false;

  entity_type_id: number = 2;
  type: string = "client";
  name: string = "";
  profil_id!:number;
  password: string = "";
  contact: string = "";
  email: string = "";
  address: string = "";
  status_id!: number;
  logo: string ="";

  userprofile_id!: number;
  entityfirm_id!: any;
  username: string = "";
  role: string = "";
  firstname: string = "";
  lastname: string = "";
  code: string = "";
  mobile: string = "";
  avatar: any;

  entity_product_id!: number;
  weight: number = 0;
  price: number= 0;


  user_logged!: any;
  npage!: number;
  token!: any;
  decode_token!: any;
  user_logged_id!: any;

  information!: string;
  start: number = 0;

  submit: boolean = false;

  itemDetail: boolean = false;  
  addItem: boolean = false;  
  addAdminItem: boolean = false;  
  editItem: boolean = false;
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
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    registerLocaleData( fr,'fr-FR' );

    this.exist_phone_error = false;
    
    /** spinner starts on init */
    this.SpinnerService.show();
    
    this.getProduct();
    this.getRoles();
    this.getEntityType();
    this.getItems();
    this.makePassword(12);
    this.getUserLogged();

    this.formGroupAdd = new FormGroup({
      // entity_type_id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', []),
      contact: new FormControl('', [Validators.pattern("^[0-9]{10}$")]),
      email: new FormControl('', [Validators.email]),
      logo: new FormControl('', []),
    });

    this.formGroupEdit = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', []),
      contact: new FormControl('', [Validators.pattern("^[0-9]{10}$")]),
      email: new FormControl('', [Validators.email]),
    });

    this.formGroup2 = new FormGroup({
      entity_product_id: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      price: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
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

  getUserLogged(){
    this.appService.getUserProfile().subscribe((data: any) => {
      this.user_logged = data.data;
      this.permissions = this.user_logged.permissions;
      if(this.permissions.includes("organization.view")){
        this.permitted = true;
      } else {
        //this.notPermission();
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

  resetAll() {
    this.formGroupAdd.reset();
    this.formGroupEdit.reset();
    this.formGroup2.reset();

    this.name = "";
    this.address = "";
    this.contact = "";
    this.email = "";

    this.firstname = "";
    this.lastname = "";
    this.mobile = "";
    this.email = "";
  }

  onSelectLogo(event:any) {
    const file = event.target.files[0];
    const typeFile = file.type.split('/');
    const filemb: number = file.size;
    if (typeFile[1] === 'png' || typeFile[1] === 'jpg' || typeFile[1] === 'jpeg' || typeFile[1] === 'gif') {
      if(filemb <= 50000){
        this.logoError = false;
        this.logofiles = file;
        const reader = new FileReader();
        reader.onload = event => this.logoSrc = reader.result as string;

        reader.readAsDataURL(this.logofiles);
        console.log(this.logofiles);
      } else {
        this.logo = "";
        this.logoError = true;
        this.logoErrorMessage = "La taille du fichier doit être inférieure à 50 Ko !";
      }

    } else {
      this.logo = "";
      this.logoError = true;
      this.logoErrorMessage = "Un fichier de type image est requis !";
    }

    // this.logofiles = event.target.files[0];
    // const reader = new FileReader();
    // reader.onload = event => this.logoSrc = reader.result as string;

    // reader.readAsDataURL(this.logofiles);
    // //console.log(this.logofiles);
  }

  onSelectAvatar(event:any) {
    this.avatarfiles = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => this.avatarSrc = reader.result as string;

    reader.readAsDataURL(this.avatarfiles);
    //console.log(this.avatarfiles);
  }

  onChange(event:any) {
    this.SpinnerService.show();
    this.getItems();
  }

  getRoles(){
    this.appService.getProfile().subscribe((data: any) => {
      this.listRole = data.data;
    });
  }

  getProduct(){
    this.appService.getAllProduct().subscribe((data: any) => {
      this.listProduct = data.data;
    });
  }

  getEntityType(){
    this.appService.getEntityType().subscribe((data: any) => {
      this.listEntityType = data.data;
    });
  }

  getPaginate(data:any){
    this.current_page = data?.meta?.current_page;
    this.first_page_url = data?.meta?.first_page_url;
    this.from = data?.meta?.from;
    this.last_page = data?.meta?.last_page;
    this.last_page_url = data?.meta?.last_page_url;
    this.links = data?.meta?.links;
    this.next_page_url = data?.meta?.next_page_url;
    this.per_page = data?.meta?.per_page;
    this.prev_page_url = data?.meta?.prev_page_url;
    this.to = data?.meta?.to;
    this.total = data?.meta?.total;
  }

  getItems(){
    this.appService.getSeller(this.current_page,this.type).subscribe((data: any) => {
      this.listItem = data.data;

      this.getPaginate(data);

      this.SpinnerService.hide();

    });
  }

  search(){
    this.SpinnerService.show();
    this.appService.getSellerSearch(this.current_page,this.type,this.information).subscribe((data: any) => {
      this.listItem = data.data;
      
      this.getPaginate(data);

      this.SpinnerService.hide();

    })
  }

  paginate(){
    if(this.information){
      this.search()
    } else {
      this.SpinnerService.show();
      this.appService.getSellerPaginate(this.current_page,this.type).subscribe((data: any) => {
        this.listItem = data.data;
        
        this.getPaginate(data);

        this.SpinnerService.hide();

      })
    }
  }

  nextPage() {
    this.SpinnerService.show();
    this.current_page = this.current_page + 1;
    this.paginate();
  }

  previousPage() {
    this.SpinnerService.show();
    this.current_page = this.current_page - 1;
    this.paginate();
  }

  otherPageLeft1() {
    this.current_page = this.current_page - 1;
    this.paginate();
  }

  otherPageLeft2() {
    this.current_page = this.current_page - 2;
    this.paginate();
  }

  otherPageRigth1() {
    this.current_page = this.current_page + 1;
    this.paginate();
  }

  otherPageRigth2() {
    this.current_page = this.current_page + 2;
    this.paginate();
  }

  firstPage() {
    this.current_page = 1;
    this.paginate();
  }

  lastPage() {
    this.current_page = this.last_page;
    this.paginate();
  }

  itemAdd() {
    this.addItem = true;
    this.editItem = false;
    this.itemDetail = false;
    this.enableItem = false;
    this.disableItem = false;
    this.addAdminItem = false;
    this.resetAll();
  }

  itemEdit(item:any) {
    this.addItem = false;
    this.editItem = true;
    this.itemDetail = false;
    this.enableItem = false;
    this.disableItem = false;
    this.addAdminItem = false;
    this.itemSelected = item;
    this.entity_type_id = this.itemSelected.entitytype.id;
    this.name = this.itemSelected.name;
    this.contact = this.itemSelected.contact;
    this.email = this.itemSelected.email;
    this.password = this.itemSelected.password;
    this.address = this.itemSelected.address;
    this.logo = this.itemSelected.logo;
    this.status_id = this.itemSelected.status_id.id;
  }

  itemAddAdmin(item:any) {
    this.addItem = false;
    this.editItem = false;
    this.itemDetail = false;
    this.enableItem = false;
    this.disableItem = false;
    this.addAdminItem = true;
    this.itemSelected = item;
  }

  itemDetails(item:any) {
    this.addItem = false;
    this.editItem = false;
    this.itemDetail = true;
    this.enableItem = false;
    this.disableItem = false;
    this.addAdminItem = false;
    this.itemSelected = item;
    this.entity_type_id = this.itemSelected.entitytype.id;
    this.name = this.itemSelected.name;
    this.contact = this.itemSelected.contact;
    this.email = this.itemSelected.email;
    this.password = this.itemSelected.password;
    this.address = this.itemSelected.address;
    this.logo = this.itemSelected.logo_url;
  }

  itemAble(item:any) {
    this.addItem = false;
    this.editItem = false;
    this.itemDetail = false;
    this.enableItem = true;
    this.disableItem = false;
    this.addAdminItem = false;
    this.itemSelected = item;
    this.entity_type_id = this.itemSelected.entitytype.id;
    this.name = this.itemSelected.name;
    this.contact = this.itemSelected.contact;
    this.email = this.itemSelected.email;
    this.password = this.itemSelected.password;
    this.address = this.itemSelected.address;
    this.logo = this.itemSelected.logo_url;
  }

  itemDisable(item:any) {
    this.addItem = false;
    this.editItem = false;
    this.itemDetail = false;
    this.enableItem = false;
    this.disableItem = true;
    this.addAdminItem = false;
    this.itemSelected = item;
    this.entity_type_id = this.itemSelected.entitytype.id;
    this.name = this.itemSelected.name;
    this.contact = this.itemSelected.contact;
    this.email = this.itemSelected.email;
    this.password = this.itemSelected.password;
    this.address = this.itemSelected.address;
    this.logo = this.itemSelected.logo_url;
  }
 
  hide_message() {
    this.exist_error = false;
    this.exist_success = false;
  }

  makePassword(length:number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&^&*()-+={}[]:;<>?';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    this.password = result;
  }

  get f() { return this.formGroupAdd.controls; }

  save(){
    this.submitted = true;
    if(this.formGroupAdd.invalid){
      //console.log("Please enter");
      return;
    } else if(this.contact.length != 10){
      this.exist_phone_error = true;
      this.phone_error = "Le numéro de téléphone doit contenir que 10 chiffres.";
    } else {
      this.exist_phone_error = false;
      this.submit = true;
      const formData:any = new FormData();
      formData.append("entity_type_id",this.entity_type_id);
      formData.append("name",this.name);
      formData.append("address",this.address);
      formData.append("contact",this.contact);
      formData.append("email",this.email);
      if(this.logofiles){
        formData.append("logo_path",this.logofiles,this.logofiles.name);
      } else {
        formData.append("logo_path",null);
      }

      // let pushItem = new EntityFirm();
      // pushItem.entity_type_id = this.entity_type_id;
      // pushItem.name = this.name;
      // pushItem.address = this.address;
      // pushItem.contact = this.contact;
      // pushItem.email = this.email;
      // if(this.logofiles){
      //   pushItem.logo_path = this.logofiles,this.logofiles.name;
      // } else {
      //   pushItem.logo_path = null;
      // } 

      let requestData = {
        entity_type_id: this.entity_type_id,
        name: this.name,
        address: this.address,
        contact: this.contact,
        email: this.email,
      }

      this.appService.addEntity(requestData).subscribe(res => {
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
          //this.registerMail();
          this.submit = false;
          this.addItem = !this.addItem
          this.resetAll();
          this.ngOnInit();
        }
        this.cs.showToast(this.toast);
      },
      (err: HttpErrorResponse) => {
        this.exist_error = true;
        this.error_message = err.error.errors;
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

  get f3() { return this.formGroupEdit.controls; }

  update(){
    this.submitted3 = true;
    if(this.formGroupEdit.invalid){
      //console.log("Errors");
      return;
    } else if(this.contact.length != 10){
      this.exist_phone_error = true;
      this.phone_error = "Le numéro de téléphone doit contenir que 10 chiffres.";
    } else {
      this.exist_phone_error = false;
      this.submit = true;  
      const formData:any = new FormData();
      formData.append("name",this.name);
      formData.append("address",this.address);
      formData.append("contact",this.contact);
      formData.append("email",this.email);
      if(this.logofiles){
        formData.append("logo_path",this.logofiles,this.logofiles.name);
      } else {
        formData.append("logo_path",null);
      }

      let requestData = {
        entity_type_id: this.entity_type_id,
        name: this.name,
        address: this.address,
        contact: this.contact,
        email: this.email,
      }

      this.appService.updateEntity(requestData,this.itemSelected.id).subscribe(res => {
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
          //this.registerMail();
          this.submit = false;
          this.itemSelected = !this.itemSelected;
          this.resetAll();
          this.ngOnInit();
        }
        this.cs.showToast(this.toast);
      },
      (err: HttpErrorResponse) => {
        this.exist_error = true;
        this.error_message = err.error.errors;
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


  enable(){
    this.submit = true;
    const formData:any = new FormData();
    formData.append("data","data");
    this.appService.enableEntity(this.itemSelected.id,formData).subscribe(res => {
      this.message = res;
      if(this.message.success == false){
        this.error_message = this.message.message;
        this.submit = false;
        this.exist_error = true;
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
        //this.ableUserAccountMail();
        this.submit = false;
        this.itemSelected = !this.itemSelected;
        this.resetAll();
        this.ngOnInit();
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

  disable(){
    this.submit = true;
    this.appService.disableEntity(this.itemSelected.id).subscribe(res => {
      this.message = res;
      if(this.message.success == false){
        this.error_message = this.message.message;
        this.submit = false;
        this.exist_error = true;
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
        //this.disableUserAccountMail();
        this.submit = false;
        this.itemSelected = !this.itemSelected;
        this.resetAll();
        this.ngOnInit();
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

  get f2() { return this.formGroup2.controls; }

  create(){
    this.submitted2 = true;
    if(this.formGroup2.invalid){
      return;
    } else if(this.mobile.length != 10){
      this.exist_phone_error = true;
      this.phone_error = "Le numéro de téléphone doit contenir que 10 chiffres.";
    } else {
      this.exist_phone_error = false;
      this.submit = true;

      let requestData = {
        entity_product_id: this.entity_product_id,
        weight: this.weight,
        price: this.price,
        last_name: this.lastname,
        children_id: this.itemSelected.id,
      }

      this.appService.addUser(requestData).subscribe(res => {
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
          this.addAdminItem = !this.addAdminItem;
          this.itemSelected = !this.itemSelected;
          this.ngOnInit();
        }
        this.cs.showToast(this.toast);
      },
      (err: HttpErrorResponse) => {
        this.exist_error = true;
        this.error_message = err.error.errors;
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