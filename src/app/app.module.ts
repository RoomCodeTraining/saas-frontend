import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import localeEn from '@angular/common/locales/en';
import { NgApexchartsModule } from "ng-apexcharts";
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";
import { CookieModule } from 'ngx-cookie';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { JarwisService } from './services/jarwis.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { LoginComponent } from './auth/login/login.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListUserComponent } from './components/app-content/user/list-user/list-user.component';
import { AddUserComponent } from './components/app-content/user/add-user/add-user.component';
import { ProfileComponent } from './components/app-content/user/profile/profile.component';
import { SetPasswordComponent } from './auth/set-password/set-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import {CookieService} from 'ngx-cookie-service';
import { ListSellerComponent } from './components/app-content/entity/seller/list-seller/list-seller.component';
import { AddSellerComponent } from './components/app-content/entity/seller/add-seller/add-seller.component';
import { EditSellerComponent } from './components/app-content/entity/seller/edit-seller/edit-seller.component';
import { EditClientComponent } from './components/app-content/entity/client/edit-client/edit-client.component';
import { ListClientComponent } from './components/app-content/entity/client/list-client/list-client.component';
import { AddClientComponent } from './components/app-content/entity/client/add-client/add-client.component';
import { ListTrackerComponent } from './components/app-content/tracker/list-tracker/list-tracker.component';
import { ListOperationComponent } from './components/app-content/operation/list-operation/list-operation.component';
import { ListPurchaseComponent } from './components/app-content/purchase/list-purchase/list-purchase.component';
import { ListSaleComponent } from './components/app-content/sale/list-sale/list-sale.component';
import { AddPurchaseComponent } from './components/app-content/purchase/add-purchase/add-purchase.component';
import { AddSaleComponent } from './components/app-content/sale/add-sale/add-sale.component';
import { AddOperationComponent } from './components/app-content/operation/add-operation/add-operation.component';
import { AddProductComponent } from './components/app-content/product/add-product/add-product.component';
import { ListProductComponent } from './components/app-content/product/list-product/list-product.component';
import { ListPriceComponent } from './components/app-content/price/list-price/list-price.component';
import { AddPriceComponent } from './components/app-content/price/add-price/add-price.component';
import { AddArticleComponent } from './components/app-content/article/add-article/add-article.component';
import { AddArticleTypeComponent } from './components/app-content/article-type/add-article-type/add-article-type.component';
import { ListArticleTypeComponent } from './components/app-content/article-type/list-article-type/list-article-type.component';
import { ListArticleComponent } from './components/app-content/article/list-article/list-article.component';
import { ListCheckoutComponent } from './components/app-content/checkout/list-checkout/list-checkout.component';
import { AddCheckoutComponent } from './components/app-content/checkout/add-checkout/add-checkout.component';
import { ListSupplierComponent } from './components/app-content/entity/supplier/list-supplier/list-supplier.component';
import { AddSupplierComponent } from './components/app-content/entity/supplier/add-supplier/add-supplier.component';
import { AddDelegateComponent } from './components/app-content/entity/delegate/add-delegate/add-delegate.component';
import { ListDelegateComponent } from './components/app-content/entity/delegate/list-delegate/list-delegate.component';
import { DetailDelegateComponent } from './components/app-content/entity/delegate/detail-delegate/detail-delegate.component';
import { DetailSupplierComponent } from './components/app-content/entity/supplier/detail-supplier/detail-supplier.component';
import { ListCampaignComponent } from './components/app-content/campaign/list-campaign/list-campaign.component';
import { SupplierStatisticComponent } from './components/app-content/statistic/supplier-statistic/supplier-statistic.component';
import { DelegateStatisticComponent } from './components/app-content/statistic/delegate-statistic/delegate-statistic.component';
import { SpecialSupplierStatisticComponent } from './components/app-content/statistic/special-supplier-statistic/special-supplier-statistic.component';
import { ListSpecialSupplierComponent } from './components/app-content/entity/list-special-supplier/list-special-supplier.component';
import { DetailSpecialSupplierComponent } from './components/app-content/entity/detail-special-supplier/detail-special-supplier.component';
import { ListDelegateForDeliveryComponent } from './components/app-content/entity/delegate/list-delegate-for-delivery/list-delegate-for-delivery.component';
import { ListCooperativeComponent } from './components/app-content/entity/cooperative/list-cooperative/list-cooperative.component';

function resourceProviderFactory(JarwisService: JarwisService) {
  return () => {
    // return new Promise((resolve, reject) => {
    //   JarwisService.autoLogIn().subscribe({
    //     next: (user) => {
    //       JarwisService.user$.next(user);
    //       resolve(true);
    //     },
    //     // TODO Must check for server errors (offline) and do something about it
    //     error: (err) => {
    //       JarwisService.logOut().subscribe(() => JarwisService.logOut());
    //       resolve(true);
    //     },
    //   });
    // });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    HeaderComponent,
    PreloaderComponent,
    SidebarComponent,
    FooterComponent,
    ListUserComponent,
    AddUserComponent,
    ProfileComponent,
    SetPasswordComponent,
    ResetPasswordComponent,
    ListSellerComponent,
    AddSellerComponent,
    EditSellerComponent,
    EditClientComponent,
    ListClientComponent,
    AddClientComponent,
    ListTrackerComponent,
    ListOperationComponent,
    ListPurchaseComponent,
    ListSaleComponent,
    AddPurchaseComponent,
    AddSaleComponent,
    AddOperationComponent,
    AddProductComponent,
    ListProductComponent,
    ListPriceComponent,
    AddPriceComponent,
    AddArticleComponent,
    AddArticleTypeComponent,
    ListArticleTypeComponent,
    ListArticleComponent,
    ListCheckoutComponent,
    AddCheckoutComponent,
    ListSupplierComponent,
    AddSupplierComponent,
    AddDelegateComponent,
    ListDelegateComponent,
    DetailDelegateComponent,
    DetailSupplierComponent,
    ListCampaignComponent,
    SupplierStatisticComponent,
    DelegateStatisticComponent,
    SpecialSupplierStatisticComponent,
    ListSpecialSupplierComponent,
    DetailSpecialSupplierComponent,
    ListDelegateForDeliveryComponent,
    ListCooperativeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgSelectModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgApexchartsModule,
    NgxCaptchaModule,
    RecaptchaV3Module,
    CookieModule.withOptions(),
    CookieModule.forRoot()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    JarwisService,
    TokenService,
    AuthService,
    AfterLoginService,
    BeforeLoginService,
    DatePipe,
    {provide: ToastrService, useClass: ToastrService},
    CookieService,
    {
      provide: APP_INITIALIZER,
      useFactory: resourceProviderFactory,
      deps: [AuthService],
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
