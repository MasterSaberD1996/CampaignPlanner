import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimatedLabelDirective} from "../animated-label.directive";
import {HomeComponent} from "./components/home/home.component";


@NgModule({
  declarations: [
    HomeComponent,
    AnimatedLabelDirective
  ],
  exports: [
    AnimatedLabelDirective
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
}
