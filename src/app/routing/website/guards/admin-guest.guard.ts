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
import { Observable } from 'rxjs';
import {AdminAuthService} from "../../../store/admin-auth-store/services/admin-auth.service";
import {first, map} from "rxjs/operators";

@Injectable()
export class AdminGuestGuard implements CanActivate, CanLoad {
  constructor(
    private readonly router: Router,
    private readonly adminAuthService: AdminAuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._getIsGuest();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._getIsGuest();
  }

  private _getIsGuest(): Observable<boolean> {
    return this.adminAuthService.isGuest$.pipe(
      first(),
      map(isGuest => {
        if (!isGuest) {
          this.router.navigateByUrl('/admin');
        }

        return isGuest;
      })
    );
  }
}
