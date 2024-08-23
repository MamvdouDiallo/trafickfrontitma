import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddEntenteComponent } from "./add-entente/add-entente.component";
import { DetailEntenteComponent } from "./detail-entente/detail-entente.component";
import { ListEntenteComponent } from "./list-entente/list-entente.component";



const routes: Routes = [

  {
    path: "add",
    component:AddEntenteComponent ,
  },
  {
    path: "detail",
    component: DetailEntenteComponent,
  },
  {
    path: "list",
    component: ListEntenteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntenteCompensationRoutingModule {}
