import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignCardComponent } from './components/campaign-card/campaign-card.component';



@NgModule({
  declarations: [
    CampaignCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CampaignCardComponent
  ]
})
export class CampaignUiModule { }
