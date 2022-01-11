import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsListComponent } from './components/campaigns-list/campaigns-list.component';
import {CampaignRoutingModule} from "./campaign-routing.module";
import {CampaignUiModule} from "../campaign-ui/campaign-ui.module";



@NgModule({
  declarations: [
    CampaignsListComponent
  ],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    CampaignUiModule
  ]
})
export class CampaignModule { }
