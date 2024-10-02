import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddComponent } from "../consultant/add/add.component";
import { ListPlainteComponent } from "./list-plainte/list-plainte.component";
import { GestionPlainteComponent } from "./gestion-plainte/gestion-plainte.component";
import { PlainteDetailComponent } from "./palainte-detail/plainte-detail.component";
import { MiseEnOeuvrePlainteComponent } from "./mise-en-oeuvre-plainte/mise-en-oeuvre-plainte.component";


const routes: Routes = [

  {
    path: "add",
    component: AddComponent,
  },
  {
    path: "detail",
    component: PlainteDetailComponent,
  },
  {
    path: "list",
    component: ListPlainteComponent,
  },
  {
    path: "resolution",
    component: GestionPlainteComponent,
  },
  {
    path: "miseEnOeuvrePlainte",
    component: MiseEnOeuvrePlainteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlainteRoutingModule {}
