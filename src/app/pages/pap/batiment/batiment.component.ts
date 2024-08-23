import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ServiceParent } from "src/app/core/services/serviceParent";

@Component({
  selector: "app-batiment",
  standalone: true,
  imports: [],
  templateUrl: "./batiment.component.html",
  styleUrl: "./batiment.component.css",
})
export class BatimentComponent implements OnInit {
  pageSizeOptions = [5, 10, 25, 100, 500, 1000];
  pageSize: number = 10;
  pageIndex: number = 0;
  offset: number = 0;
  constructor(
    private parentService: ServiceParent,
    private _changeDetectorRef: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getBatiment();
  }

  getBatiment() {
    return this.parentService
      .list("batiments", this.pageSize, this.offset)
      .subscribe(
        (data: any) => {
          if (data["responseCode"] == 200) {
            this._changeDetectorRef.markForCheck();
          } else {
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
