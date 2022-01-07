import {Component, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleAuthMode() {
    this.currentMode === AuthMode.SignUp ? this.currentMode = AuthMode.SignIn : this.currentMode = AuthMode.SignUp;
  }
}
