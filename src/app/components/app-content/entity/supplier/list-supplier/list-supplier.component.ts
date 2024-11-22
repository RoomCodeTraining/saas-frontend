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
  selector: 'app-list-supplier',
  templateUrl: './list-supplier.component.html',
  styleUrls: ['./list-supplier.component.css']
})
export class ListSupplierComponent implements OnInit {

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

  entity_type_id: number = 3;
  type: string = "3";
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






  listOperation: any;
  listUserType: any;
  listOrganization: any;

  walletSelected: any;
  operationHistorySelected: any;

  formGroupOperation!: FormGroup;
  formGroupWallet!: FormGroup;
  formGroupDeposit!: FormGroup;

  submittedOperation = false;
  submittedWallet = false;
  submittedDeposit = false;


  informationOperation!: string;
  
  submitOperation: boolean = false;
  submitWallet: boolean = false;
  submitDeposit: boolean = false;
 
  operationItem: boolean = false;  

  walletItem: boolean = false;
  depositItem: boolean = false;
  operationHistoryItem: boolean = false;

  operation_current_page: number=1;
  operation_first_page_url!: string;
  operation_from!: number;
  operation_last_page!: number;
  operation_last_page_url!: string;
  operation_links!: any;
  operation_next_page_url!: string;
  operation_per_page!: number;
  operation_prev_page_url!: string;
  operation_to!: number;
  operation_total!: number;

  price_id!: number;
  purchaseable_id!: number;
  purchaseable_type: string = "user";
  wallet_id!: number;
  amount!: number;
  listSeller: any;
  listPrice: any;

  balance!: number;
  user_id!: number;

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
      telephone: new FormControl('', [Validators.pattern("^[0-9]{10}$")]),
      email: new FormControl('', [Validators.email]),
      logo: new FormControl('', []),
    });

    this.formGroupEdit = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', []),
      telephone: new FormControl('', [Validators.pattern("^[0-9]{10}$")]),
      email: new FormControl('', [Validators.email]),
    });

    this.formGroup2 = new FormGroup({
      entity_product_id: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      price: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    });

    this.formGroupOperation = new FormGroup({
      entity_product_id: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      price_id: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    });

    this.formGroupWallet = new FormGroup({
      entity_product_id: new FormControl('', [Validators.required]),
      balance: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
    });

    this.formGroupDeposit = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
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

  goBack(){
    this._location.back();
  }

  goToDetail(data: any){
    // @ts-ignore
    localStorage.setItem("SUPPLIER_DATA", JSON.stringify(data));
    this.router.navigateByUrl("/supplier-detail");
  }

  resetAll() {
    this.formGroupAdd.reset();
    this.formGroupEdit.reset();
    this.formGroup2.reset();

    this.name = "";
    this.address = "";
    this.telephone = "";
    this.email = "";

    this.firstname = "";
    this.lastname = "";
    this.mobile = "";
    this.email = "";

    this.weight = 0;
    this.amount = 0;
  }

  onChangeProduct(event:any) {
    this.appService.getAllPriceByProductId(event).subscribe((data: any) => {
      this.listPrice = data.data;
    });
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
    this.appService.getProfil().subscribe((data: any) => {
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
    this.appService.getSupplier(this.current_page,this.type).subscribe((data: any) => {
      this.listItem = data.data;

      this.getPaginate(data);

      this.SpinnerService.hide();

    });
  }

  search(){
    this.SpinnerService.show();
    this.appService.getSupplierSearch(this.current_page,this.type,this.information).subscribe((data: any) => {
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
      this.appService.getSupplierPaginate(this.current_page,this.type).subscribe((data: any) => {
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


  getPaginateOperation(data:any){
    this.operation_current_page = data?.meta?.current_page;
    this.operation_first_page_url = data?.meta?.first_page_url;
    this.operation_from = data?.meta?.from;
    this.operation_last_page = data?.meta?.last_page;
    this.operation_last_page_url = data?.meta?.last_page_url;
    this.operation_links = data?.meta?.links;
    this.operation_next_page_url = data?.meta?.next_page_url;
    this.operation_per_page = data?.meta?.per_page;
    this.operation_prev_page_url = data?.meta?.prev_page_url;
    this.operation_to = data?.meta?.to;
    this.operation_total = data?.meta?.total;
  }

  getOperation(){
    this.SpinnerService.show();
    this.appService.getOperation(this.walletSelected.reference,this.operation_current_page).subscribe((data: any) => {
      this.listOperation = data?.data;

      this.getPaginateOperation(data);

      this.SpinnerService.hide();

    });
  }

  searchOperation(){
    this.SpinnerService.show();
    this.appService.getOperationSearch(this.walletSelected.id,this.operation_current_page,this.informationOperation).subscribe((data: any) => {
      this.listOperation = data?.data;
      
      this.getPaginateOperation(data);

      this.SpinnerService.hide();

    })
  }

  paginateOperation(){
    if(this.informationOperation){
      this.searchOperation()
    } else {
      this.SpinnerService.show();
        this.appService.getOperationPaginate(this.walletSelected.id,this.operation_current_page).subscribe((data: any) => {
          this.listOperation = data?.data;
          
          this.getPaginateOperation(data);

          this.SpinnerService.hide();

        })
    }
  }

  nextPageOperation() {
    this.SpinnerService.show();
    this.operation_current_page = this.current_page + 1;
    this.paginateOperation();
  }

  previousPageOperation() {
    this.SpinnerService.show();
    this.operation_current_page = this.current_page - 1;
    this.paginateOperation();
  }

  otherPageLeft1Operation() {
    this.operation_current_page = this.current_page - 1;
    this.paginateOperation();
  }

  otherPageLeft2Operation() {
    this.operation_current_page = this.current_page - 2;
    this.paginateOperation();
  }

  otherPageRigth1Operation() {
    this.operation_current_page = this.current_page + 1;
    this.paginateOperation();
  }

  otherPageRigth2Operation() {
    this.operation_current_page = this.current_page + 2;
    this.paginateOperation();
  }

  firstPageOperation() {
    this.operation_current_page = 1;
    this.paginateOperation();
  }

  lastPageOperation() {
    this.operation_current_page = this.last_page;
    this.paginateOperation();
  }

  itemAdd() {
    this.addItem = true;
    this.editItem = false;
    this.itemDetail = false;
    this.enableItem = false;
    this.disableItem = false;
    this.addAdminItem = false;
    this.walletItem = false;
    this.operationItem = false;
    this.resetAll();
  }

  itemEdit(item:any) {
    this.addItem = false;
    this.editItem = true;
    this.itemDetail = false;
    this.enableItem = false;
    this.disableItem = false;
    this.addAdminItem = false;
    this.walletItem = false;
    this.operationItem = false;
    this.itemSelected = item;
    this.entity_type_id = this.itemSelected.entitytype.id;
    this.name = this.itemSelected.name;
    this.telephone = this.itemSelected.telephone;
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
    this.walletItem = false;
    this.operationItem = false;
    this.itemSelected = item;
  }

  itemDetails(item:any) {
    this.addItem = false;
    this.editItem = false;
    this.itemDetail = true;
    this.enableItem = false;
    this.disableItem = false;
    this.addAdminItem = false;
    this.walletItem = false;
    this.operationItem = false;
    this.itemSelected = item;
    this.entity_type_id = this.itemSelected.entitytype.id;
    this.name = this.itemSelected.name;
    this.telephone = this.itemSelected.telephone;
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
    this.walletItem = false;
    this.operationItem = false;
    this.itemSelected = item;
    this.entity_type_id = this.itemSelected.entitytype.id;
    this.name = this.itemSelected.name;
    this.telephone = this.itemSelected.telephone;
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
    this.walletItem = false;
    this.operationItem = false;
    this.itemSelected = item;
    this.entity_type_id = this.itemSelected.entitytype.id;
    this.name = this.itemSelected.name;
    this.telephone = this.itemSelected.telephone;
    this.email = this.itemSelected.email;
    this.password = this.itemSelected.password;
    this.address = this.itemSelected.address;
    this.logo = this.itemSelected.logo_url;
  }

  itemWallet(item:any) {
    this.addItem = false;
    this.editItem = false;
    this.itemDetail = false;
    this.enableItem = false;
    this.disableItem = false;
    this.addAdminItem = false;
    this.walletItem = true;
    this.operationItem = false;
    this.itemSelected = item;
    this.entity_type_id = this.itemSelected.entitytype.id;
    this.name = this.itemSelected.name;
    this.telephone = this.itemSelected.telephone;
    this.email = this.itemSelected.email;
    this.password = this.itemSelected.password;
    this.address = this.itemSelected.address;
    this.logo = this.itemSelected.logo_url;
  }

  itemOperation(item:any) {
    this.addItem = false;
    this.editItem = false;
    this.itemDetail = false;
    this.enableItem = false;
    this.disableItem = false;
    this.addAdminItem = false;
    this.walletItem = false;
    this.operationItem = true;
    this.itemSelected = item;
    this.entity_type_id = this.itemSelected.entitytype.id;
    this.name = this.itemSelected.name;
    this.telephone = this.itemSelected.telephone;
    this.email = this.itemSelected.email;
    this.password = this.itemSelected.password;
    this.address = this.itemSelected.address;
    this.logo = this.itemSelected.logo_url;
  }

  itemDeposit(item:any) {
    this.depositItem = true;
    this.operationHistoryItem = false;
    this.walletSelected = item;
  }

  itemOperationHistory(item:any) {
    this.depositItem = false;
    this.operationHistoryItem = true;
    this.walletSelected = item;
    this.getOperation();
  }

  itemCancel(item:any) {
    this.editItem = false;
    this.itemDetail = false;
    this.operationItem = false;
    this.enableItem = false;
    this.walletItem = false;
    this.operationHistorySelected = item;
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
    } else if(this.telephone.length != 10){
      this.exist_phone_error = true;
      this.phone_error = "Le numéro de téléphone doit contenir que 10 chiffres.";
    } else {
      this.exist_phone_error = false;
      this.submit = true;
      const formData:any = new FormData();
      formData.append("entity_type_id",this.entity_type_id);
      formData.append("name",this.name);
      formData.append("address",this.address);
      formData.append("telephone",this.telephone);
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
      // pushItem.telephone = this.telephone;
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
        telephone: this.telephone,
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
        // this.error_message = err.error.errors;
        this.error_message = err.error.message;
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
        console.log('vcdgvgdsvgd',err);
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
    } else if(this.telephone.length != 10){
      this.exist_phone_error = true;
      this.phone_error = "Le numéro de téléphone doit contenir que 10 chiffres.";
    } else {
      this.exist_phone_error = false;
      this.submit = true;  
      const formData:any = new FormData();
      formData.append("name",this.name);
      formData.append("address",this.address);
      formData.append("telephone",this.telephone);
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
        telephone: this.telephone,
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

  cancel(){
    this.submit = true;
    
    let requestData = {
      operation_id: this.operationHistorySelected.id,
    }

    this.appService.cancelOperation(this.operationHistorySelected.id,requestData).subscribe(res => {
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
        this.editItem = !this.editItem;
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

  get fOperation() { return this.formGroupOperation.controls; }

  saveOperation(){
    this.submittedOperation = true;
    if(this.formGroupOperation.invalid){
      return;
    } else {
      this.submitOperation = true;
      
      let requestData = {
        entity_product_id: this.entity_product_id,
        weight: this.weight,
        price_id: this.price_id,
        purchaseable_type: this.purchaseable_type,
        purchaseable_id: this.itemSelected.id,
      }

      this.appService.addPurchase(requestData).subscribe(res => {
        this.message = res;
        if(this.message.success == false){
          this.submitOperation = false;
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
          this.submitOperation = false;
          this.operationItem = !this.operationItem;
          this.itemSelected = !this.itemSelected;
          this.resetAll();
          this.ngOnInit();
        }
        this.cs.showToast(this.toast);
      },
      (err: HttpErrorResponse) => {
        this.exist_error = true;
        this.error_message = err.error.errors;
        this.submitOperation = false;
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
        this.submitOperation = false;
        this.SpinnerService.hide();
        this.cs.showToast(this.toast);
      })
    }
  }

  get fWallet() { return this.formGroupWallet.controls; }

  saveWallet(){
    this.submittedWallet = true;
    if(this.formGroupWallet.invalid){
      return;
    } else {
      this.submitWallet = true;
      
      let requestData = {
        product_id: this.entity_product_id,
        balance: this.balance,
        user_id: this.itemSelected.id,
      }

      this.appService.addWallet(requestData).subscribe(res => {
        this.message = res;
        if(this.message.success == false){
          this.submitWallet = false;
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
          this.submitWallet = false;
          this.walletItem = !this.walletItem;
          this.itemSelected = !this.itemSelected;
          this.resetAll();
          this.ngOnInit();
        }
        this.cs.showToast(this.toast);
      },
      (err: HttpErrorResponse) => {
        this.exist_error = true;
        this.error_message = err.error.errors;
        this.submitWallet = false;
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
        this.submitWallet = false;
        this.SpinnerService.hide();
        this.cs.showToast(this.toast);
      })
    }
  }

  get fDeposit() { return this.formGroupDeposit.controls; }

  saveDeposit(){
    this.submittedDeposit = true;
    if(this.formGroupDeposit.invalid){
      return;
    } else {
      this.submitDeposit = true;
      
      let requestData = {
        amount: this.amount,
        wallet_id: this.walletSelected.id,
      }

      this.appService.addDeposit(requestData).subscribe(res => {
        this.message = res;
        if(this.message.success == false){
          this.submitDeposit = false;
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
          this.submitDeposit = false;
          this.depositItem = !this.depositItem;
          this.itemSelected = !this.itemSelected;
          this.resetAll();
          this.ngOnInit();
        }
        this.cs.showToast(this.toast);
      },
      (err: HttpErrorResponse) => {
        this.exist_error = true;
        this.error_message = err.error.errors;
        this.submitDeposit = false;
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
        this.submitDeposit = false;
        this.SpinnerService.hide();
        this.cs.showToast(this.toast);
      })
    }
  }

}