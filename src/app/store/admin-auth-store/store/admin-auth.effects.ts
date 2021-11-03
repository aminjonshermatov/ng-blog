import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Login, LoginFailed, LoginSuccess} from "./admin-auth.actions";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {AdminAuthService} from "../services/admin-auth.service";
import {of} from "rxjs";

@Injectable()
export class AdminAuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly adminAuthService: AdminAuthService
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
}
