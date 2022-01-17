import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsListComponent } from './components/campaigns-list/campaigns-list.component';
import {CampaignRoutingModule} from "./campaign-routing.module";
import {CampaignUiModule} from "../campaign-ui/campaign-ui.module";
import { CampaignDetailsComponent } from './components/campaign-details/campaign-details.component';
import { NewCampaignComponent } from './components/new-campaign/new-campaign.component';
import {CoreModule} from "../core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CampaignNavigationComponent} from "./components/campaign-navigation/campaign-navigation.component";



@NgModule({
  declarations: [
    CampaignsListComponent,
    CampaignDetailsComponent,
    NewCampaignComponent,
    CampaignNavigationComponent
  ],
    imports: [
        CommonModule,
        CampaignRoutingModule,
        CampaignUiModule,
        CoreModule,
        ReactiveFormsModule
    ]
})
export class CampaignModule { }
