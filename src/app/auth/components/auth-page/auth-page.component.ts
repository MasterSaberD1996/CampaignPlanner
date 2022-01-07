import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {take} from "rxjs";
import {Router} from "@angular/router";
import {routeOnSuccess} from "../../../core/operators/routeOnSuccess";

enum AuthMode {
  SignIn,
  SignUp
}

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  public AuthMode: typeof AuthMode = AuthMode;
  public currentMode: AuthMode = AuthMode.SignUp;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
  }

  public toggleAuthMode() {
    this.currentMode === AuthMode.SignUp ? this.currentMode = AuthMode.SignIn : this.currentMode = AuthMode.SignUp;
  }

  public googleSignIn() {
    this.authService.signInWithGoogle()
      .pipe(
        routeOnSuccess(this.router, ''),
        take(1)
      ).subscribe();
  }
}
