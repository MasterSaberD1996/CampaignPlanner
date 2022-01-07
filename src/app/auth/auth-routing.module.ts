import {RouterModule, Routes} from "@angular/router";
import {AuthPageComponent} from "./components/auth-page/auth-page.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component:AuthPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
