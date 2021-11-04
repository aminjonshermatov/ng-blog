import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AdminMenuService} from "../services/admin-menu.service";
import {select, Store} from "@ngrx/store";
import {InitMenu, InitMenuFailed, InitMenuSuccess} from "./admin-menu.actions";
import {catchError, filter, map, switchMap, withLatestFrom} from "rxjs/operators";
import {getLoaded, getLoading} from "./admin-menu.selectors";
import {of} from "rxjs";

@Injectable()
export class AdminMenuEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly adminMenuService: AdminMenuService,
    private readonly store$: Store
  ) { }

  getMenu$ = createEffect(() => this.actions$.pipe(
    ofType(InitMenu),
    withLatestFrom(
      this.store$.pipe(select(getLoaded)),
      this.store$.pipe(select(getLoading))
    ),
    filter(([_, loaded, loading]) => !loaded && loading),
    switchMap(() => this.adminMenuService.getMenu().pipe(
      map(data => InitMenuSuccess({ data })),
      catchError(error => of(
        InitMenuFailed({ serverError: error?.serverError })
      ))
    ))
  ));
}
