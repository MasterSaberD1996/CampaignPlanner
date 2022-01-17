import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, Observable, switchMap} from "rxjs";
import {ICampaign} from "../../../core/models/campaign.model";
import {DatabaseService} from "../../../core/services/database.service";

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss']
})
export class CampaignDetailsComponent implements OnInit {
  // @ts-ignore
  public vm$: Observable<ICampaign>;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly databaseService: DatabaseService
  ) { }

  public ngOnInit(): void {
    this.vm$ = this.activatedRoute.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id: number) => {
          if (!id) {
            throw "No Campaign Id Found";
          }
          return this.databaseService.loadedData$
            .pipe(
              map((campaigns) => {
                const campaign = campaigns.find(x => x.id === id);
                if (!campaign) {
                  throw "Cannot find campaign";
                }
                return campaign;
              })
            )
        })
      )
  }

}
