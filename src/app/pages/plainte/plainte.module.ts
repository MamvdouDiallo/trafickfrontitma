import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlainteComponent } from './add-plainte/add-plainte.component';
import { ListPlainteComponent } from './list-plainte/list-plainte.component';
import { TableauComponent } from "../../shared/tableau/tableau.component";
import { UIModule } from "../../shared/ui/ui.module";
import { AngularMaterialModule } from 'src/app/shared/angular-materiel-module/angular-materiel-module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TableauComponent,
    UIModule,
    AngularMaterialModule
]
})
export class PlainteModule { }
