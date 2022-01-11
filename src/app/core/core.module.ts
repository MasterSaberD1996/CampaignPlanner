import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnimatedLabelDirective} from "../animated-label.directive";


@NgModule({
  declarations: [
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
