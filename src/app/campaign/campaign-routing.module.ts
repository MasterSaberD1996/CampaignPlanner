import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CampaignsListComponent} from "./components/campaigns-list/campaigns-list.component";
import {CampaignDetailsComponent} from "./components/campaign-details/campaign-details.component";
import {NewCampaignComponent} from "./components/new-campaign/new-campaign.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CampaignsListComponent
  },
  {
    path: 'new',
    component: NewCampaignComponent
  },
  {
    path: ':id',
    component: CampaignDetailsComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule {}
