import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from './ui/ui.module';

import { WidgetModule } from './widget/widget.module';
import { AngularMaterialModule } from './angular-materiel-module/angular-materiel-module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatatableComponent } from './datatable/datatable.component';

@NgModule({
  declarations: [
    DatatableComponent
  ],
  imports: [
    CommonModule,
    UIModule,
    WidgetModule,
    AngularMaterialModule,
    MatFormFieldModule
  ],
})

export class SharedModule { }
