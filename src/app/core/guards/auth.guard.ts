import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {filter, map, Observable, switchMap} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.init$.pipe(
      filter((isInit) => isInit),
      switchMap(() => {
        return this.authService.currentUser
          .pipe(
            map((user) => {
              if (!!user) {
                return true;
              }
              return this.router.createUrlTree(['auth']);
            })
          );
      })
    )
  }

}
