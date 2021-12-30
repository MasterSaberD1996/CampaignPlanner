import { Component } from '@angular/core';
import {DatabaseService} from "./core/services/database.service";
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DnD-Campaign-Planner';
  public vm$ = this.databaseService.loadedData$;
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly authService: AuthService
  ) {
    // authService.signInWithGoogle();
  }
}
