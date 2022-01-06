// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import {initializeApp} from 'firebase/app'
import {getAnalytics} from "firebase/analytics";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";

declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

const firebaseConfig = {
  apiKey: "AIzaSyCIyO6e9Rx3-PfOZUMT-HtldWlEaf6kWKI",
  authDomain: "dnd-campaign-planner.firebaseapp.com",
  databaseURL: "https://dnd-campaign-planner-default-rtdb.firebaseio.com",
  projectId: "dnd-campaign-planner",
  storageBucket: "dnd-campaign-planner.appspot.com",
  messagingSenderId: "1025639363724",
  appId: "1:1025639363724:web:174534281c9fd97eb7b7a9",
  measurementId: "G-TZPEVT23KK"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
