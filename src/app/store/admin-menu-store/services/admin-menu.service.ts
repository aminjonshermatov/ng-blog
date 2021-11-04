import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NestedTreeNode} from "../store/admin-menu.reducer";

@Injectable({
  providedIn: 'root'
})
export class AdminMenuService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  public getMenu(): Observable<NestedTreeNode[]> {
    return this.httpClient.get<NestedTreeNode[]>(`http://localhost:3000/menu`);
  }
}
