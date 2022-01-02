import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { AuthPageComponent } from './core/components/auth-page/auth-page.component';
import { HomeComponent } from './core/components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    void setPersistence(auth, browserLocalPersistence)
  }
}

const firebaseConfig = {
  apiKey: "AIzaSyCIyO6e9Rx3-PfOZUMT-HtldWlEaf6kWKI",
  authDomain: "dnd-campaign-planner.firebaseapp.com",
  databaseURL: "https://dnd-campaign-planner-default-rtdb.firebaseio.com",
  projectId: "dnd-campaign-planner",
  storageBucket: "dnd-campaign-planner.appspot.com",
  messagingSenderId: "1025639363724",
  appId: "1:1025639363724:web:fd57aaea4185d03ab7b7a9",
  measurementId: "G-0PXT9QYS11"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);
