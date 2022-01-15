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
import {initializeAppCheck, ReCaptchaV3Provider} from "firebase/app-check";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(authService: AuthService) {
    if (!localStorage.getItem(`firebase:authUser:${environment.firebaseConfig.apiKey}:[DEFAULT]`)) {
      authService.setUserInitialized(true);
    }
    void setPersistence(auth, browserLocalPersistence)
  }
}

export const app = initializeApp(environment.firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(environment.recaptchaToken),
  isTokenAutoRefreshEnabled: true
})
