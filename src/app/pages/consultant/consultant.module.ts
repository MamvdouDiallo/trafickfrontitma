import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { AngularMaterialModule } from 'src/app/shared/angular-materiel-module/angular-materiel-module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ConsultantModule { }
