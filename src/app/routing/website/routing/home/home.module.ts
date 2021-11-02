import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {RouterModule} from "@angular/router";
import {MatSliderModule} from "@angular/material/slider";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatDialogModule,
    MatTableModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomePageComponent }
    ])
  ]
})
export class HomeModule { }
