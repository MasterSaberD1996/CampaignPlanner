import { Component, OnInit } from '@angular/core';
import {ICampaign} from "../../../core/models/campaign.model";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {DatabaseService} from "../../../core/services/database.service";

@Component({
  selector: 'app-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss']
})
export class CampaignsListComponent implements OnInit {
  // @ts-ignore
  public campaigns$: Observable<ICampaign[]>;

  constructor(
    private readonly router: Router,
    private readonly databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    this.campaigns$ = this.databaseService.loadedData$;
  }

  public routeToCampaign(campaign: ICampaign): void {
    void this.router.navigate(['campaigns', campaign.id])
  }

  public routeToCreateCampaign(): void {
    void this.router.navigate(['campaigns', 'new']);
  }
}
