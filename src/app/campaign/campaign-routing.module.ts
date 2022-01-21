import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CampaignsListComponent} from "./components/campaigns-list/campaigns-list.component";
import {CampaignDetailsComponent} from "./components/campaign-details/campaign-details.component";
import {NewCampaignComponent} from "./components/new-campaign/new-campaign.component";
import {CharactersPageComponent} from "./components/characters-page/characters-page.component";

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
    component: CampaignDetailsComponent,
    children: [
      {
        path: 'characters',
        component: CharactersPageComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule {}
