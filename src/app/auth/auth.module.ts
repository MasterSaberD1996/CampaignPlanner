import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthPageComponent} from "./components/auth-page/auth-page.component";
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {CoreModule} from "../core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import { SignInComponent } from './components/sign-in/sign-in.component';
import {CoolSocialLoginButtonsModule} from "@angular-cool/social-login-buttons";



@NgModule({
  declarations: [AuthPageComponent, SignUpComponent, SignInComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    CoolSocialLoginButtonsModule,
  ]
})
export class AuthModule { }
