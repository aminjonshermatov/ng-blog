import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AuthData} from "../store/admin-auth.reducer";
import {JwtHelperService} from "@auth0/angular-jwt";
import {select, Store} from "@ngrx/store";
import {getAccessToken} from "../store/admin-auth.selectors";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  public accessToken = '';

  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtHelperService: JwtHelperService,
    private readonly store$: Store
  ) {
    this.store$.pipe(select(getAccessToken))
      .subscribe(accessToken => this.accessToken = accessToken || '');
  }

  public login(body: { login: string, password: string }) {
    return this.httpClient.post<AuthData>(
      `http://localhost:3000/auth/login`,
      body
    ).pipe(
      map(res => ({
        ...res,
        ...this.jwtHelperService.decodeToken(res.accessToken)
      }))
    );
  }
}
