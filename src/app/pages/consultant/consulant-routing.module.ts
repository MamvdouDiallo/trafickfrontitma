import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { AddComponent } from "./add/add.component";
import { DetailComponent } from "./detail/detail.component";
import { MoprofileComponent } from "./moprofile/moprofile.component";



const routes: Routes = [
  {
    path: "list",
    component: ListComponent,
  },

  {
    path: "add",
    component: AddComponent,
  },
  // {
  //   path: "detail",
  //   component: DetailComponent,
  // },
  {
    path: "detail",
    component: MoprofileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultantRoutingModule {}
