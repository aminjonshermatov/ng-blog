import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as adminAuth from "../../../../store/admin-auth-store/store/admin-auth.selectors";
import {Login} from "../../../../store/admin-auth-store/store/admin-auth.actions";

@Component({
  selector: 'app-admin-login-block',
  templateUrl: './admin-login-block.component.html',
  styleUrls: ['./admin-login-block.component.scss']
})
export class AdminLoginBlockComponent implements OnInit {

  public loading$: Observable<boolean> = this.store$.pipe(
    select(adminAuth.getLoading)
  );

  public loaded$: Observable<boolean> = this.store$.pipe(
    select(adminAuth.getLoaded)
  );

  public serverError$: Observable<string> = this.store$.pipe(
    select(adminAuth.getServerError)
  );

  constructor(
    private readonly store$: Store
  ) { }

  ngOnInit(): void {
  }

  public onLogin(loginPayload: { login: string, password: string }): void {
    console.log('On Login', loginPayload);
    this.store$.dispatch(Login(loginPayload));
  }
}
