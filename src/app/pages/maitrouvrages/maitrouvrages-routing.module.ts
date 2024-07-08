import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MolistComponent } from "./molist/molist.component";
import { MoprofileComponent } from "./moprofile/moprofile.component";

const routes: Routes = [
  {
    path: "list",
    component: MolistComponent,
  },
  
  {
    path: "profile/:id",
    component: MoprofileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaitrouvragesRoutingModule {}
