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
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
