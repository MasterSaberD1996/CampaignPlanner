import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-campaign-navigation',
  templateUrl: './campaign-navigation.component.html',
  styleUrls: ['./campaign-navigation.component.scss']
})
export class CampaignNavigationComponent implements OnInit {

  constructor(
    public readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

}
