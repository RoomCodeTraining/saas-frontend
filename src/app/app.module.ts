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
