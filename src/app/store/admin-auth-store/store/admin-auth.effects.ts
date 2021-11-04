import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ExtractLoginData, InitAdminAuth, Login, LoginFailed, LoginSuccess, LogoutSuccess} from "./admin-auth.actions";
import {catchError, distinctUntilChanged, filter, first, map, skip, switchMap, tap} from "rxjs/operators";
import {AdminAuthService} from "../services/admin-auth.service";
import {fromEvent, of, timer} from "rxjs";
import {select, Store} from "@ngrx/store";
import {getAuthData, isAuth} from "./admin-auth.selectors";
import {AuthData} from "./admin-auth.reducer";
import {Router} from "@angular/router";

@Injectable()
export class AdminAuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly adminAuthService: AdminAuthService,
    private readonly store$: Store,
    private readonly router: Router
  ) { }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(Login),
    switchMap(loginAction => this.adminAuthService.login({
      login: loginAction.login,
      password: loginAction.password
    }).pipe(
      map(authData => LoginSuccess({ authData })),
      catchError(error => of(
        LoginFailed({serverError: error.message || 'Something went wrong!' })
      ))
    ))
  ));

  refresh$ = createEffect(() => this.actions$.pipe(
    ofType(LoginSuccess),
    switchMap(
      ({ authData }) => timer((authData.exp - 60) * 1000 - Date.now())
    ),
    switchMap(() => this.store$.pipe(
      select(isAuth),
      first(),
      filter(isAdminAuth => isAdminAuth)
    )),
    switchMap(() => this.adminAuthService.refreshToken()),
    map(authData => LoginSuccess({ authData }))
  ));

  saveAuthDataToLocalStorage$ = createEffect(() => this.actions$.pipe(
    ofType(LoginSuccess),
    tap(({ authData }) => {
      localStorage.setItem('authData', JSON.stringify(authData));
    })
  ), { dispatch: false });

  extractAuthData$ = createEffect(() => this.actions$.pipe(
    ofType(InitAdminAuth, ExtractLoginData),
    map(() => {
      const authDataStr = localStorage.getItem('authData');
      if (!authDataStr) {
        return LogoutSuccess();
      }

      try {
        const authData: AuthData = JSON.parse(authDataStr);

        if ((authData.exp - 60) * 1000 < Date.now()) {
          return LogoutSuccess();
        }

        return LoginSuccess({ authData });
      } catch {
        return LogoutSuccess();
      }
    })
  ));

  listerStorageEffect$ = createEffect(() => this.actions$.pipe(
    ofType(InitAdminAuth),
    switchMap(() => fromEvent(window, 'storage')),
    map(() => ExtractLoginData())
  ));

  listerAuthorizeEffect$ = createEffect(() => this.actions$.pipe(
    ofType(InitAdminAuth),
    switchMap(() => this.adminAuthService.isAuth$),
    distinctUntilChanged(),
    skip(1),
    tap(isAuthorized => {
      this.router.navigateByUrl(
        isAuthorized ? '/admin' : '/admin/auth/login'
      );
    })
  ), { dispatch: false });
}
