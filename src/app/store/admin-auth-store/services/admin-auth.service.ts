import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AuthData} from "../store/admin-auth.reducer";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly jwtHelperService: JwtHelperService
  ) { }

  public login(body: { login: string, password: string }): Observable<AuthData> {
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

  public refreshToken(): Observable<AuthData> {
    return this.httpClient.post<AuthData>(
      `http://localhost:3000/auth/refresh`,
      {}
    ).pipe(
      map(res => ({
        ...res,
        ...this.jwtHelperService.decodeToken(res.accessToken)
      }))
    );
  }
}
