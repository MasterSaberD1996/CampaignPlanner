import { Component, OnInit } from '@angular/core';
import {ICampaign} from "../../../core/models/campaign.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss']
})
export class CampaignsListComponent implements OnInit {
  public campaigns: ICampaign[] = [];

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  public routeToCampaign(campaign: ICampaign): void {
    void this.router.navigate(['campaigns', campaign.id])
  }

  public routeToCreateCampaign(): void {
    void this.router.navigate(['campaigns', 'new']);
  }
}
