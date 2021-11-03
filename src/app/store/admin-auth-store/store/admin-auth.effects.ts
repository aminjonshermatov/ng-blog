import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Login, LoginFailed, LoginSuccess} from "./admin-auth.actions";
import {catchError, delay, delayWhen, filter, first, map, switchMap, tap} from "rxjs/operators";
import {AdminAuthService} from "../services/admin-auth.service";
import {of, timer} from "rxjs";
import {select, Store} from "@ngrx/store";
import {isAuth} from "./admin-auth.selectors";

@Injectable()
export class AdminAuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly adminAuthService: AdminAuthService,
    private readonly store$: Store
  ) { }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(Login),
    switchMap(loginAction => this.adminAuthService.login({
      login: loginAction.login,
      password: loginAction.password
    }).pipe(
      map(loginSuccessData => LoginSuccess(loginSuccessData)),
      catchError(error => of(
        LoginFailed({serverError: error.message || 'Something went wrong!' })
      ))
    ))
  ));

  refresh$ = createEffect(() => this.actions$.pipe(
    ofType(LoginSuccess),
    delayWhen(authData => timer((authData.exp - 60) * 1000 - Date.now())),
    switchMap(() => this.store$.pipe(
      select(isAuth),
      first(),
      filter(isAdminAuth => isAdminAuth)
    )),
    switchMap(() => this.adminAuthService.refreshToken().pipe(
      map(loginSuccessData => LoginSuccess(loginSuccessData))
    ))
  ));
}
