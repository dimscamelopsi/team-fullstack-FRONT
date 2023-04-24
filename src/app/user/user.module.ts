import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgottenPasswordComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
