import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { ListUserComponent } from './components/app-content/user/list-user/list-user.component';
import { AddUserComponent } from './components/app-content/user/add-user/add-user.component';
import { ProfileComponent } from './components/app-content/user/profile/profile.component';
import { SetPasswordComponent } from './auth/set-password/set-password.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ListSellerComponent } from './components/app-content/entity/seller/list-seller/list-seller.component';
import { AddSellerComponent } from './components/app-content/entity/seller/add-seller/add-seller.component';
import { ListClientComponent } from './components/app-content/entity/client/list-client/list-client.component';
import { AddClientComponent } from './components/app-content/entity/client/add-client/add-client.component';
import { ListTrackerComponent } from './components/app-content/tracker/list-tracker/list-tracker.component';
import { ListOperationComponent } from './components/app-content/operation/list-operation/list-operation.component';
import { ListSaleComponent } from './components/app-content/sale/list-sale/list-sale.component';
import { ListPurchaseComponent } from './components/app-content/purchase/list-purchase/list-purchase.component';
import { AddOperationComponent } from './components/app-content/operation/add-operation/add-operation.component';
import { AddSaleComponent } from './components/app-content/sale/add-sale/add-sale.component';
import { AddPurchaseComponent } from './components/app-content/purchase/add-purchase/add-purchase.component';
import { ListProductComponent } from './components/app-content/product/list-product/list-product.component';
import { AddProductComponent } from './components/app-content/product/add-product/add-product.component';
import { ListPriceComponent } from './components/app-content/price/list-price/list-price.component';
import { AddPriceComponent } from './components/app-content/price/add-price/add-price.component';
import { ListArticleTypeComponent } from './components/app-content/article-type/list-article-type/list-article-type.component';
import { AddArticleTypeComponent } from './components/app-content/article-type/add-article-type/add-article-type.component';
import { ListArticleComponent } from './components/app-content/article/list-article/list-article.component';
import { AddArticleComponent } from './components/app-content/article/add-article/add-article.component';
import { ListCheckoutComponent } from './components/app-content/checkout/list-checkout/list-checkout.component';
import { AddCheckoutComponent } from './components/app-content/checkout/add-checkout/add-checkout.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path:'set-password',
    component: SetPasswordComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path:'forgot-password',
    component: ForgetPasswordComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path:'reset-password',
    component: ResetPasswordComponent,
    canActivate: [BeforeLoginService]
  },
  {
    path:'',
    component: DashboardComponent,
    canActivate: [AfterLoginService]
  },
  // {
  //   path:'**',
  //   component: PageNotFoundComponent,
  //   canActivate: [AfterLoginService]
  // },
  // {
  //   path:'accueil',
  //   component: DashboardComponent,
  //   canActivate: [AfterLoginService]
  // }, 

  {
    path:'list-user',
    component: ListUserComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-user',
    component: AddUserComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'user-profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-tracker',
    component: ListTrackerComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'entity/seller/list',
    component: ListSellerComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'entity/seller/add',
    component: AddSellerComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'entity/client/list',
    component: ListClientComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'entity/client/add',
    component: AddClientComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-operation',
    component: ListOperationComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-operation',
    component: AddOperationComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-sale',
    component: ListSaleComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-sale',
    component: AddSaleComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-purchase',
    component: ListPurchaseComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-purchase',
    component: AddPurchaseComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-product',
    component: ListProductComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-product',
    component: AddProductComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-price',
    component: ListPriceComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-price',
    component: AddPriceComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-article-type',
    component: ListArticleTypeComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-article-type',
    component: AddArticleTypeComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-article',
    component: ListArticleComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-article',
    component: AddArticleComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'list-checkout',
    component: ListCheckoutComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'add-checkout',
    component: AddCheckoutComponent,
    canActivate: [AfterLoginService]
  },
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
