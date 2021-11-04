import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {first, map} from "rxjs/operators";
import {AdminAuthService} from "../../../store/admin-auth-store/services/admin-auth.service";

@Injectable()
export class AdminAuthGuard implements CanActivate, CanLoad {
  constructor(
    private readonly router: Router,
    private readonly adminAuthService: AdminAuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._getIsAuth();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._getIsAuth();
  }

  private _getIsAuth(): Observable<boolean | UrlTree> {
    return this.adminAuthService.isAuth$.pipe(
      first(),
      map(isAuth => isAuth ? isAuth : this.router.createUrlTree(['/admin', 'auth', 'login']))
    );
  }
}
