import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdminGuestGuard} from "./guards/admin-guest.guard";
import {AdminAuthGuard} from "./guards/admin-auth.guard";
import { StoreModule } from '@ngrx/store';
import {DEFAULT_ROUTER_FEATURENAME, routerReducer} from "@ngrx/router-store";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(DEFAULT_ROUTER_FEATURENAME, routerReducer),
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('./routing/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'admin/auth',
        loadChildren: () => import('./routing/admin-auth/admin-auth.module').then(m => m.AdminAuthModule),
        canLoad: [AdminGuestGuard],
        canActivate: [AdminGuestGuard]
      },
      {
        path: 'admin',
        loadChildren: () => import('./routing/admin/admin.module').then(m => m.AdminModule),
        canLoad: [AdminAuthGuard],
        canActivate: [AdminAuthGuard]
      },
      {
        path: '**',
        loadChildren: () => import('./routing/not-found/not-found.module').then(m => m.NotFoundModule)
      }
    ])
  ],
  providers: [
    AdminGuestGuard,
    AdminAuthGuard
  ]
})
export class WebsiteModule { }
