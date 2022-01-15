import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/services/auth.service";
import {filter, switchMap, take, tap} from "rxjs";
import {Router} from "@angular/router";
import {routeOnSuccess} from "../../../core/operators/routeOnSuccess";
// import {ReCaptchaV3Service} from "ng-recaptcha";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  // @ts-ignore
  public form: FormGroup

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    // private readonly recaptchaV3Service: ReCaptchaV3Service
  ) {
  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  public sendLogIn(): void {
    if (!this.form.valid) {
      return;
    }
    const {email, password} = this.form.value;
    // this.recaptchaV3Service.execute("SignIn")
          this.authService.signInWithEmail(email, password)
      .pipe(
        tap((token) => console.debug(token)),
        filter((token) => !!token),
        // switchMap(() => {
        // }),
        routeOnSuccess(this.router, ''),
        take(1)
      ).subscribe()
  }
}
