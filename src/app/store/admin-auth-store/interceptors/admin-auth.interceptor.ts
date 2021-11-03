import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {getAccessToken} from "../store/admin-auth.selectors";
import {catchError, first, mergeMap} from "rxjs/operators";

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly store$: Store
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store$.pipe(
      select(getAccessToken),
      first(),
      mergeMap(accessToken => {
        if (accessToken) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        }

        return next.handle(request).pipe(
          catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              return EMPTY;
            }

            throw error;
          })
        );
      })
    );
  }
}
