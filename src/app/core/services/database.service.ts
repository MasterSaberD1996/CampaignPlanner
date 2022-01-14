import { Injectable } from '@angular/core';
import {filter, map, Observable, of} from "rxjs";
import {AuthService} from "./auth.service";
import {ICampaign} from "../models/campaign.model";
import {getDatabase, goOnline, ref, query} from "firebase/database";
import {app} from "../../app.module";
// import { ref, getDatabase, goOnline, query } from 'firebase/database';
// import { app } from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public loadedData$: Observable<ICampaign[]>;

  constructor(
    private readonly authService: AuthService
  ) {
    this.loadedData$ = this.authService.currentUser
      .pipe(
        filter((user) => !!user),
        map((user) => {
          if (!user) {
            throw "User expected"
          }
          const database = getDatabase(app);
          goOnline(database);
          return query(ref(database, `users/${user.uid}/campaigns`)).toJSON();
        }),
        map((data) => {
          if (data.length) {
            try {
              return JSON.parse(data) as ICampaign[]
            } catch {
              throw "Invalid JSON received"
            }
          } else {
            return [];
          }
        })
      );
  }

  public saveCampaign(campaign: ICampaign): Observable<boolean> {
    return of(false);
  }
}
