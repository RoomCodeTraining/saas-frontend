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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-special-supplier-statistic',
  templateUrl: './special-supplier-statistic.component.html',
  styleUrls: ['./special-supplier-statistic.component.css']
})
export class SpecialSupplierStatisticComponent implements OnInit {

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

  organization_type!: string;
  name: string = "";
  profil_id!:number;
  password: string = "";
  telephone: string = "";
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

  type: string = "vendeur";
  entity_product_id!: number;
  weight: number = 0;
  price: number= 0;
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

  listEntityProduct: any;
  listEntityCampaign: any;

  campaign_id!: number;
  entity_type_id: number = 5;

  listStatistics: any;
  date_from: any = environment.statistic_default_date_from;
  date_to: any;

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
    private datePipe: DatePipe,
    private _location: Location,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.date_to = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    registerLocaleData( fr,'fr-FR' );
    //this.submit = false;

    /** spinner starts on init */
    this.SpinnerService.show();
    
    this.getUserLogged();
    
    this.formGroup = new FormGroup({
      date_from: new FormControl('', [Validators.required]),
      date_to: new FormControl('', [Validators.required]),
      entity_product_id: new FormControl('', [Validators.required]),
      campaign_id: new FormControl('', [Validators.required]),
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
      this.getEntityProduct();
      this.getEntityCampaign();
      // this.permissions = this.user_logged.permissions;
      // if(this.permissions.includes("user.view")){
      //   this.permitted = true;
      // } else {
      //   this.notPermission();
      // }
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
    this.formGroup.reset();

    this.name = "";
    this.address = "";
    this.telephone = "";
    this.email = "";

    this.firstname = "";
    this.lastname = "";
    this.mobile = "";
    this.email = "";
  }

  onSelectLogo(event:any) {
    this.logofiles = event.target.files[0];
    const reader = new FileReader();
    reader.onload = event => this.logoSrc = reader.result as string;

    reader.readAsDataURL(this.logofiles);
    //console.log(this.logofiles);
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

  getEntityProduct(){
    this.appService.getAllEntityProduct(this.user_logged.entity.id).subscribe((data: any) => {
      this.listEntityProduct = data.data;
      this.SpinnerService.hide();
    });
  }

  getEntityCampaign(){
    this.appService.getAllEntityCampaign(this.user_logged.entity.id).subscribe((data: any) => {
      this.listEntityCampaign = data.data;
      this.SpinnerService.hide();
    });
  }

  getEntityStatistics(item:any){
    this.SpinnerService.show();
    this.appService.getSpecialSupplierStatistics(item.entity_id,this.entity_product_id,this.campaign_id,this.date_from,this.date_to).subscribe((data: any) => {
      this.listStatistics = data.data;
      this.itemSelected = item;
      this.itemDetail = true;
      this.SpinnerService.hide();
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
    this.appService.getEntitiesStatistics(this.entity_type_id,this.entity_product_id,this.campaign_id,this.date_from,this.date_to).subscribe((data: any) => {
      this.listItem = data.data;

      this.getPaginate(data);

      this.SpinnerService.hide();

    });
  }

  search(){
    this.SpinnerService.show();
    this.appService.getAllOperationSearch(this.current_page,this.information).subscribe((data: any) => {
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
        this.appService.getAllOperationPaginate(this.current_page).subscribe((data: any) => {
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
    this.itemDetail = false;
    this.enableItem = false;
    this.disableItem = false;
    this.resetAll();
  }

  itemEdit(item:any) {
    this.editItem = true;
    this.itemDetail = false;
    this.resetItem = false;
    this.enableItem = false;
    this.disableItem = false;
    this.itemSelected = item;
    this.email = this.itemSelected.email;
    this.mobile = this.itemSelected.contact;
    this.firstname = this.itemSelected.first_name;
    this.lastname = this.itemSelected.last_name;
    this.password = this.itemSelected.password;
    // this.userprofile_id = this.itemSelected.userprofile_id;
    // this.entityfirm_id = this.itemSelected.entityfirm_id;
    this.avatar = this.itemSelected.avatar;
    this.status_id = this.itemSelected.status_id;
  }

  itemDetails(item:any) {
    this.editItem = false;
    this.itemDetail = true;
    this.resetItem = false;
    this.enableItem = false;
    this.disableItem = false;
    this.itemSelected = item;
    this.email = this.itemSelected.email;
    this.mobile = this.itemSelected.contact;
    this.firstname = this.itemSelected.firstname;
    this.lastname = this.itemSelected.lastname;
    this.password = this.itemSelected.password;
    // this.userprofile_id = this.itemSelected.userprofile_id;
    // this.entityfirm_id = this.itemSelected.entityfirm_id;
    this.avatar = this.itemSelected.avatar;
    this.status_id = this.itemSelected.status_id;
  }

  itemAble(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.resetItem = false;
    this.enableItem = true;
    this.disableItem = false;
    this.itemSelected = item;
    this.email = this.itemSelected.email;
    this.mobile = this.itemSelected.contact;
    this.firstname = this.itemSelected.firstname;
    this.lastname = this.itemSelected.lastname;
    this.password = this.itemSelected.password;
    // this.userprofile_id = this.itemSelected.userprofile_id;
    // this.entityfirm_id = this.itemSelected.entityfirm_id;
    this.avatar = this.itemSelected.avatar;
    this.status_id = this.itemSelected.status_id;
  }

  itemDisable(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.resetItem = false;
    this.enableItem = false;
    this.disableItem = true;
    this.itemSelected = item;
    this.email = this.itemSelected.id.email;
    this.mobile = this.itemSelected.id.contact;
    this.firstname = this.itemSelected.id.firstname;
    this.lastname = this.itemSelected.id.lastname;
    this.password = this.itemSelected.id.password;
    this.userprofile_id = this.itemSelected.userprofile_id.id;
    this.entityfirm_id = this.itemSelected.entityfirm_id.id;
    this.avatar = this.itemSelected.avatar;
    this.status_id = this.itemSelected.status_id;
  }

  itemReset(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.resetItem = true;
    this.enableItem = false;
    this.disableItem = false;
    this.itemSelected = item;
    this.email = this.itemSelected.id.email;
    this.mobile = this.itemSelected.id.contact;
    this.firstname = this.itemSelected.id.firstname;
    this.lastname = this.itemSelected.id.lastname;
    //this.password = this.itemSelected.id.password;
    this.userprofile_id = this.itemSelected.userprofile_id.id;
    this.entityfirm_id = this.itemSelected.entityfirm_id.id;
    this.avatar = this.itemSelected.avatar;
    this.status_id = this.itemSelected.status_id;
  }

  itemCancel(item:any) {
    this.editItem = false;
    this.itemSelected = item;
  }
 
  hide_message() {
    this.exist_error = false;
    this.exist_success = false;
  }

  get f() { return this.formGroup.controls; }

  save(){
    this.submitted = true;
    if(this.formGroup.invalid){
      return;
    } else {
      this.submit = true;

      this.appService.getEntitiesStatistics(this.entity_type_id,this.entity_product_id,this.campaign_id,this.date_from,this.date_to).subscribe((data: any) => {
        this.message = data;
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
          this.listItem = data.data.entities;
          this.SpinnerService.hide();
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
    };

  }

}
