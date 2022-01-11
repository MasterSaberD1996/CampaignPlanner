import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CampaignsListComponent} from "./components/campaigns-list/campaigns-list.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CampaignsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule {}
