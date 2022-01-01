import { Injectable } from '@angular/core';
import { logEvent } from "firebase/analytics";
import {analytics} from "../../app.module";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() { }

  public sendEvent(eventName: string, properties?: any): void {
    logEvent(analytics, eventName, properties);
  }

  public sendError(message: string): void {
    logEvent(analytics, "Error_Occurred", {message: message});
  }
}
