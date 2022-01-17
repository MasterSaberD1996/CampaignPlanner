import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, from, map, Observable, of, switchMap} from "rxjs";
import {AuthService} from "./auth.service";
import {ICampaign} from "../models/campaign.model";
import {getDatabase, goOnline, ref, get, onValue, push, set} from "firebase/database";
import {app} from "../../app.module";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private loadedCampaigns: BehaviorSubject<ICampaign[]> = new BehaviorSubject<ICampaign[]>([])
  public loadedData$: Observable<ICampaign[]> = this.loadedCampaigns.asObservable();
  private readonly db = getDatabase(app);

  constructor(
    private readonly authService: AuthService
  ) {
    this.authService.currentUser
      .pipe(
        filter((user) => !!user),
        map((user) => {
          if (!user) {
            throw "user expected"
          }
          const queryRef = ref(this.db, `users/${user.uid}/campaigns`)
          onValue(queryRef, (snapshot) => {
            const campaigns: ICampaign[] = [];
            snapshot.forEach((childSnapshot) => {
              const campaign = childSnapshot.val() as ICampaign;
              campaigns.push(campaign)
            });
            this.loadedCampaigns.next(campaigns);
          });
        }),
      ).subscribe();
  }

  public saveCampaign(campaign: ICampaign): Observable<ICampaign> {
    return this.authService.currentUser
      .pipe(
        switchMap((user) => {
          if (!user) {
            throw "expected user not to be null"
          }
          const campaignsRef = ref(this.db, `users/${user.uid}/campaigns`);
          const newCampaignRef = push(campaignsRef);
          return from(set(newCampaignRef, campaign).then(() => {
            return true;
          }).catch((err) => {
            console.error(err);
            return false;
          }))
        }),
        switchMap((success) => {
          if (success) {
            return this.loadedData$.pipe(
              map((campaigns) => {
                return campaigns[campaigns.length - 1];
              })
            )
          }
          throw "failed to create campaign";
        })
      )
  }
}
