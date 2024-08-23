import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipOrganisationComponent } from './pip-organisation/pip-organisation.component';
import { PipOngComponent } from './pip-ong/pip-ong.component';
import { PipMediaComponent } from './pip-media/pip-media.component';
import { PipEntrepriseComponent } from './pip-entreprise/pip-entreprise.component';



@NgModule({
  declarations: [
    PipOrganisationComponent,
    PipOngComponent,
    PipMediaComponent,
    PipEntrepriseComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PipModule { }
