import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {isEqual} from "lodash-es";
import {AuthService} from "../../../core/services/auth.service";
import {filter, map, switchMap, take} from "rxjs";
import {Router} from "@angular/router";
import {routeOnSuccess} from "../../../core/operators/routeOnSuccess";
import {ReCaptchaV3Service} from "ng-recaptcha";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // @ts-ignore
  public form: FormGroup;

  private get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly recaptchaV3Service: ReCaptchaV3Service
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirm: new FormControl(null, [Validators.required, this.customSame.bind(this)])
    })
  }

  private customSame(control: AbstractControl): ValidationErrors | null {
    if (!this.form) {
      return null;
    }
    const confirmValue = control.value;
    const passwordValue = this.passwordControl.value;
    if (!confirmValue || !passwordValue) {
      return null;
    }

    return isEqual(passwordValue, confirmValue) ? null : {notEqual: true}
  }

  public sendSignUp(): void {
    if (!this.form.valid) {
      return;
    }
    const {email, password} = this.form.value;

    this.recaptchaV3Service.execute('SignUp')
      .pipe(
        switchMap(() => {
          return this.authService.signUpWithEmail(email, password);
        }),
        routeOnSuccess(this.router, ''),
        take(1)
      ).subscribe();
  }
}
