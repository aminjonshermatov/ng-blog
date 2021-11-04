import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {InitMenu} from "../../../../../store/admin-menu-store/store/admin-menu.actions";
import {getMenuData} from "../../../../../store/admin-menu-store/store/admin-menu.selectors";

@Component({
  selector: 'app-admin-nav-block',
  templateUrl: './admin-nav-block.component.html',
  styleUrls: ['./admin-nav-block.component.scss']
})
export class AdminNavBlockComponent implements OnInit {

  data$ = this.store$.pipe(select(getMenuData));

  constructor(
    private readonly store$: Store
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(InitMenu());
  }

}
