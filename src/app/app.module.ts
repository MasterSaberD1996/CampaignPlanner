import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import {ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "./core/core.module";
import {AuthService} from "./core/services/auth.service";
import {environment} from "../environments/environment";
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from "ng-recaptcha";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    RecaptchaV3Module
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptchaToken
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(authService: AuthService) {
    if (!localStorage.getItem('firebase:authUser:AIzaSyCIyO6e9Rx3-PfOZUMT-HtldWlEaf6kWKI:[DEFAULT]')) {
      authService.setUserInitialized(true);
    }
    void setPersistence(auth, browserLocalPersistence)
  }
}

export const app = initializeApp(environment.firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
