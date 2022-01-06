import { AuthGuard } from './auth.guard';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {autoMockerInstance} from "../../../test-utils/autoMockerPlus";

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceMock: AuthService;
  let routerMock: Router;

  beforeEach(() => {
    authServiceMock = autoMockerInstance.mockClass(AuthService);
    routerMock = autoMockerInstance.mockClass(Router);
    guard = new AuthGuard(authServiceMock, routerMock)
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
