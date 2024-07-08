import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlatpickrModule } from "angularx-flatpickr";
import { MaitrouvragesRoutingModule } from "./maitrouvrages-routing.module";
import { MoprofileComponent } from "./moprofile/moprofile.component";
import { MolistComponent } from "./molist/molist.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgApexchartsModule } from "ng-apexcharts";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ModalModule } from "ngx-bootstrap/modal";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { UIModule } from "src/app/shared/ui/ui.module";
import { WidgetModule } from "src/app/shared/widget/widget.module";
import { AngularMaterialModule } from "src/app/shared/angular-materiel-module/angular-materiel-module";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@NgModule({
  declarations: [MoprofileComponent, MolistComponent],
  imports: [
    CommonModule,
    MaitrouvragesRoutingModule,
    CommonModule,
    WidgetModule,
    UIModule,
    NgSelectModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    FlatpickrModule.forRoot(),
    BsDropdownModule,
    ModalModule,
    AngularMaterialModule,
    NgMultiSelectDropDownModule
  ],
})
export class MaitrouvragesModule {}
