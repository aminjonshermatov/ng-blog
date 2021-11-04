import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridPageComponent } from './pages/grid-page/grid-page.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    GridPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: GridPageComponent
      }
    ])
  ]
})
export class GridModule { }
