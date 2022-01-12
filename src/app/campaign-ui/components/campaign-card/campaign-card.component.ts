import {Component, Input, OnInit} from '@angular/core';
import {ICampaign} from "../../../core/models/campaign.model";

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss']
})
export class CampaignCardComponent implements OnInit {
  // @ts-ignore
  @Input() public campaign: ICampaign;

  constructor() { }

  public ngOnInit(): void {
  }

}
