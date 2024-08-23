import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PipAddComponent } from "./pip-add/pip-add.component";
import { PipDetailComponent } from "./pip-detail/pap-detail.component";
import { PipListComponent } from "./pip-list/pip-list.component";
import { PipMediaComponent } from "./pip-media/pip-media.component";
import { PipOngComponent } from "./pip-ong/pip-ong.component";
import { PipOrganisationComponent } from "./pip-organisation/pip-organisation.component";


const routes: Routes = [

  {
    path: "add",
    component: PipAddComponent,
  },
  {
    path: "detail",
    component: PipDetailComponent,
  },
  {
    path: "medias",
    component: PipListComponent,
  },
  {
    path: "ong",
    component: PipListComponent,
  },
  {
    path: "entreprise",
    component: PipListComponent,
  },
  {
    path: "organisation",
    component: PipListComponent,
  },
  {
    path: "bailleurs",
    component: PipListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PipRoutingModule {}
