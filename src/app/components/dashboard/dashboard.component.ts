import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JarwisService } from 'src/app/services/jarwis.service';
import { GlobalConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { NgxSpinnerService } from "ngx-spinner"; 
import {Location} from '@angular/common';
import { environment } from '../../../environments/environment';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { AccessService } from 'src/app/services/access.service';
import { HttpErrorResponse } from '@angular/common/http';
import jwt_decode from "jwt-decode";

import {
	ChartComponent,
	ApexAxisChartSeries,
	ApexChart,
	ApexXAxis,
	ApexDataLabels,
	ApexStroke,
	ApexMarkers,
	ApexYAxis,
	ApexGrid,
	ApexTitleSubtitle,
	ApexLegend,
	ApexNonAxisChartSeries,
	ApexPlotOptions,
	ApexResponsive,
} from "ng-apexcharts";
import { AppService } from 'src/app/services/app-content/app.service';



export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	stroke: ApexStroke;
	dataLabels: ApexDataLabels;
	markers: ApexMarkers;
	colors: string[];
	yaxis: ApexYAxis;
	grid: ApexGrid;
	legend: ApexLegend;
	title: ApexTitleSubtitle;
};

export type OrderPieChartOptions = {
	series: ApexNonAxisChartSeries;
	chart: ApexChart;
	labels: string[];
	colors: string[];
	legend: ApexLegend;
	plotOptions: ApexPlotOptions;
	responsive: ApexResponsive | ApexResponsive[];
};

export type EditionPieChartOptions = {
	series: ApexNonAxisChartSeries;
	chart: ApexChart;
	labels: string[];
	colors: string[];
	legend: ApexLegend;
	plotOptions: ApexPlotOptions;
	responsive: ApexResponsive | ApexResponsive[];
};

export interface data {
	[key: string]: any;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public orderPieChartOptions!: Partial<OrderPieChartOptions>;
  public editionPieChartOptions!: Partial<EditionPieChartOptions>;

  toast!: toastPayload;
  message:any;
  error_message: any;
  exist_error:boolean = false;

  formGroup!: FormGroup;
  submitted = false;

  user_logged!: any;
  listUserService!: any;
  profile_id!:number;

  token!: any;
  decode_token!: any;
  user_logged_id!: any;
  user_logged_name!: any;
  user_logged_profile_name!: any;

  nb_all_order:number = 0;
  nb_all_order_cima:number = 0;
  nb_all_order_pool:number = 0;
  nb_all_order_in_pending:number = 0;
  nb_all_edition_main:number = 0;
  nb_all_edition:number = 0;
  nb_daily_edition:number = 0;
  nb_bureau:number = 0;
  nb_user:number = 0;

  nb_cima_jaune:number = 0;
  nb_cima_verte:number = 0;
  nb_cima_blue_matca:number = 0;
  nb_pool_blue:number = 0;
  nb_pool_rouge:number = 0;
  nb_pool_marron:number = 0;

  listChartOrder:any = [];
  listChartEdition:any = [];

  count_order_month_1:number = 0;
  count_order_month_2:number = 0;
  count_order_month_3:number = 0;
  count_order_month_4:number = 0;
  count_order_month_5:number = 0;
  count_order_month_6:number = 0;
  count_order_month_7:number = 0;
  count_order_month_8:number = 0;
  count_order_month_9:number = 0;
  count_order_month_10:number = 0;
  count_order_month_11:number = 0;
  count_order_month_12:number = 0;

  count_edition_month_1:number = 0;
  count_edition_month_2:number = 0;
  count_edition_month_3:number = 0;
  count_edition_month_4:number = 0;
  count_edition_month_5:number = 0;
  count_edition_month_6:number = 0;
  count_edition_month_7:number = 0;
  count_edition_month_8:number = 0;
  count_edition_month_9:number = 0;
  count_edition_month_10:number = 0;
  count_edition_month_11:number = 0;
  count_edition_month_12:number = 0;

  listChartOrderItem: Array<{ 
    count_ordermakingbroker_id:number;
    ordermakingbroker_onbehalfofentityfirm_id:number;
    ordermakingbroker_toproviderentityfirm_id:number;
    ordermakingbroker_shopproductonsell_id:number;
    ordermakingbroker_entry_on_by_month:number;
    ordermakingbroker_entry_on_by_year:number;
    }> = [];

  listChartEditionItem: Array<{ 
	count_editaskcertificate_id:number;
	editaskcertificate_entry_on_by_year:number;
	editaskcertificate_entry_on_by_month:number;
	editaskcertificate_certificatetype_id:number;
	editaskcertificate_brokerbyentityfirm_id:number;
	brokerbyentityfirm_insurerfirm_id:number;
	brokerbyentityfirm_brokerfirm_id:number;
	}> = [];


  activeDropdown!: any; 
  userprofile_id!:number;
  listCompanyStockCimaAssigned: any;
  listCompanyStockCimaAvailable: any;
  listCompanyStockCimaUsed: any;
  listIntermediaryStockCimaAvailable: any;
  listIntermediaryStockCimaUsed: any;
  listIntermediaryStockCimaAssigned: any;
  listCompanyStockPoolTpvAssigned: any;
  listCompanyStockPoolTpvAvailable: any;
  listCompanyStockPoolTpvUsed: any;
  listIntermediaryStockPoolTpvAvailable: any;
  listIntermediaryStockPoolTpvUsed: any;
  listIntermediaryStockPoolTpvAssigned: any;
  listCompanyStockMatcaAssigned: any;
  listCompanyStockMatcaAvailable: any;
  listCompanyStockMatcaUsed: any;
  listIntermediaryStockMatcaAvailable: any;
  listIntermediaryStockMatcaUsed: any;
  listIntermediaryStockMatcaAssigned: any;

  totalCimajaune: number = 0;
  totalCimavert: number = 0;
  totalPooltpvbleueclassique: number = 0;
  totalPooltpvrouge: number = 0;
  totalPooltpvmarron: number = 0;
  totalMatcableue: number = 0;

  cima_id: number = 1;
  pool_tpv_id: number = 2;
  matca_id: number = 3;

  cima_jaune_id: number = 1;
  cima_verte_id: number = 2;
  poo_tpv_bleue_classique_id: number = 3;
  poo_tpv_rouge_id: number = 4;
  poo_tpv_marron_id: number = 5;
  matca_bleue_id: number = 6;

  totalUser: number = 0;
  totalAbleUser: number = 0;
  totalEnableUser: number = 0;

  totalOrder: number = 0;
  totalOrderApproved: number = 0;
  totalOrderPending: number = 0;
  totalOrderAwaitingConfirmation: number = 0;

  totalTransaction: number = 0;
  totalTransactionApproved: number = 0;
  totalTransactionAwaitingConfirmation: number = 0;

  totalCimaJaune: number = 0;
  totalCimaVerte: number = 0;
  totalCimaMarron: number = 0;
  totalCimaRouge: number = 0;
  totalCimaBleu: number = 0;
  totalCimaBleuMatca: number = 0;
  totalCedeao: number = 0;

  totalInsurers: number = 0;
  totalBrokers: number = 0;
  totalBancassurance: number = 0;

  totalAgent: number = 0;
  totalOffices: number = 0;
  totalAgentMandataire: number = 0;


  constructor(
    public appService: AppService,
    public Jarwis: JarwisService,
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

    /** spinner starts on init */
    this.SpinnerService.show();

    // if (!localStorage.getItem('reload')) { 
    //   localStorage.setItem('reload', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('reload') 
    // }

    this.ifUserLogged();

    this.getUserLogged();
    

  }

  ifUserLogged(){
    if(!this.Token.loggedIn()){
      this.router.navigate(['/login']);
    }
  }

  getUserLogged(){
      console.log("userprofile_id");
    this.appService.getUserProfile().subscribe((data: any) => {
      this.user_logged = data.data;
      this.userprofile_id = this.user_logged.role.id;  
      //console.log("userprofile_id",this.userprofile_id);
      this.getItems(this.userprofile_id);
    },
    (err: HttpErrorResponse) => {
        //console.log("API indisponible");
        // this.logout();
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
    //this.cs.showToast(this.toast);
    this.router.navigate(['/login']);
  }

  changeMenu(menu:any){
    if(this.activeDropdown == menu){
      this.activeDropdown = null;
    } else {
      this.activeDropdown = menu;
    }
  }

  getItems(userprofile_id: number){

    if(this.user_logged?.role?.name == 'admin'){
    //   this.statisticService.getUserStatistic().subscribe((data: any) => {
    //     this.totalUser = data.data.totalUsers.value;
    //     this.totalAbleUser = data.data.activeUsers.value;
    //     this.totalEnableUser = data.data.disabledUsers.value;
    //     this.SpinnerService.hide();  
    //   });

    //   this.statisticService.getOrderStatistic().subscribe((data: any) => {
    //     this.totalOrder = data.data.total.value;
    //     this.totalOrderApproved = data.data.approved.value;
    //     this.totalOrderPending = data.data.pending.value;
    //     this.totalOrderAwaitingConfirmation = data.data.awaiting_confirmation.value;
    //     this.SpinnerService.hide();  
    //   });

    //   this.statisticService.getCertificateStatistic().subscribe((data: any) => {
    //     this.totalCedeao = data.data.cedeao.value;
    //     this.SpinnerService.hide();  
    //   });

    //   this.statisticService.getOrganizationStatistic().subscribe((data: any) => {
    //     this.totalInsurers = data.data.insurers.value;
    //     this.totalBrokers = data.data.brokers.value;
    //     this.totalBancassurance = data.data.bancassurances.value;  
    //     this.SpinnerService.hide();  
    //   });
    // } else if(this.user_logged?.role?.name === 'operating_admin'){
    //   this.statisticService.getOrderStatistic().subscribe((data: any) => {
    //     this.totalOrder = data.data.total.value;
    //     this.totalOrderPending = data.data.pending.value;
    //     this.totalOrderAwaitingConfirmation = data.data.awaiting_confirmation.value;
    //     this.SpinnerService.hide();  
    //   });
    // } else if(this.user_logged?.role?.name === 'main_office_admin' &&  this.user_logged.organization.organization_type.code == 'insurer'){
    //   this.statisticService.getUserStatistic().subscribe((data: any) => {
    //     this.totalUser = data.data.totalUsers.value;
    //     this.totalAbleUser = data.data.activeUsers.value;
    //     this.totalEnableUser = data.data.disabledUsers.value;
    //     this.SpinnerService.hide();  
    //   });

    //   this.statisticService.getOfficeStatistic().subscribe((data: any) => {
    //     this.totalOffices = data.data.offices.value;
    //     this.totalAgent = data.data.agent.value;
    //     this.totalAgentMandataire = data.data.agent_mandataire.value;  
    //     this.SpinnerService.hide();  
    //   });
    // } else if(((this.user_logged?.role?.name === 'main_office_admin') && (this.user_logged.organization.organization_type.code != 'insurer' && this.user_logged.organization.organization_type.code != 'supplier')) || this.user_logged?.role?.name == 'office_admin'){
    //   this.statisticService.getUserStatistic().subscribe((data: any) => {
    //     this.totalUser = data.data.totalUsers.value;
    //     this.totalAbleUser = data.data.activeUsers.value;
    //     this.totalEnableUser = data.data.disabledUsers.value;
    //     this.SpinnerService.hide();  
    //   });

    //   this.statisticService.getOfficeStatistic().subscribe((data: any) => {
    //     this.totalOffices = data.data.offices.value;
    //     this.totalAgent = data.data.agent.value;
    //     this.totalAgentMandataire = data.data.agent_mandataire.value;  
    //     this.SpinnerService.hide();  
    //   });

    //   this.statisticService.getTransactionStatistic().subscribe((data: any) => {
    //     this.totalTransaction = data.data.total.value;
    //     this.totalTransactionApproved = data.data.approved.value;
    //     this.totalTransactionAwaitingConfirmation = data.data.pending.value;
    //     this.SpinnerService.hide();  
    //   });

    //   this.statisticService.getCertificateStatistic().subscribe((data: any) => {
    //     this.totalCedeao = data.data.cedeao.value;
    //     this.SpinnerService.hide();  
    //   });

    // } else if(this.user_logged?.role?.name === 'stock_manager'){
    //   this.statisticService.getOrderStatistic().subscribe((data: any) => {
    //     this.totalOrder = data.data.total.value;
    //     this.totalOrderApproved = data.data.approved.value;
    //     this.totalOrderAwaitingConfirmation = data.data.awaiting_confirmation.value;
    //     this.SpinnerService.hide();  
    //   });

    //   this.statisticService.getTransactionStatistic().subscribe((data: any) => {
    //     this.totalTransaction = data.data.total.value;
    //     this.totalTransactionApproved = data.data.approved.value;
    //     this.totalTransactionAwaitingConfirmation = data.data.pending.value;
    //     this.SpinnerService.hide();  
    //   });
    // } else if(this.user_logged?.role?.name === 'broker_manager' || this.user_logged?.role?.name === 'office_manager'){
    //   this.statisticService.getTransactionStatistic().subscribe((data: any) => {
    //     this.totalTransaction = data.data.total.value;
    //     this.totalTransactionApproved = data.data.approved.value;
    //     this.totalTransactionAwaitingConfirmation = data.data.pending.value;
    //     this.SpinnerService.hide();  
    //   });
    // } else if(this.user_logged?.role?.name === 'office_master' || this.user_logged?.role?.name === 'standard_user'){
    //   this.statisticService.getCertificateStatistic().subscribe((data: any) => {
    //     this.totalCedeao = data.data.cedeao.value;
    //     this.SpinnerService.hide();  
    //   });
    // } else if(this.user_logged?.role?.name === 'main_office_admin' &&  this.user_logged.organization.organization_type.code == 'supplier'){
    //   this.statisticService.getOrderStatistic().subscribe((data: any) => {
    //     this.totalOrder = data.data.total.value;
    //     this.totalOrderApproved = data.data.approved.value;
    //     this.totalOrderAwaitingConfirmation = data.data.awaiting_confirmation.value;
    //     this.SpinnerService.hide();  
    // });
    } else {

      this.SpinnerService.hide();

    }

  }  

}
