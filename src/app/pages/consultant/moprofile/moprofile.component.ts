import { Component, OnInit, inject } from "@angular/core";

import { revenueBarChart, statData } from "./data";

import { ChartType } from "./profile.model";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { Auth } from "src/app/store/Authentication/auth.models";
import { ActivatedRoute } from "@angular/router";
import { MoService } from "src/app/core/services/mo.service";
import { Mo, ResponseData } from "src/app/shared/models/Projet.model";
import { LocalService } from "src/app/core/services/local.service";
@Component({
  selector: "app-moprofile",
  templateUrl: "./moprofile.component.html",
  styleUrl: "./moprofile.component.css",
})
export class MoprofileComponent {
  breadCrumbItems: Array<{}>;

  getImageFromBase64(imageType: string, imageName: number[]): string {
    const base64Representation = "data:" + imageType + ";base64," + imageName;
    return base64Representation;
  }

  private authService = inject(AuthenticationService);
  private localService = inject(LocalService);
  user: Auth;
  profileId: number;
  taches: any[];

  myImage: string;
  revenueBarChart: ChartType;

  statData: any;
  constructor(private route: ActivatedRoute, private moservice: MoService) {}

  Detailuser?: Mo = {
    checked: "",
    projects: [],
  };
  ngOnInit() {
    this.user = this.authService.currentUser();
    let consultantId = this.localService.getDataJson("consultant").id;

    console.log(consultantId);

    this.moservice
      .getById(consultantId, "taches/consultant")
      .subscribe((resp) => {
        this.taches = resp["data"];
        console.log(this.taches);

      });

    this.moservice.getById(consultantId, "users").subscribe(
      (data: ResponseData<Mo>) => {
        this.Detailuser = data.data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.myImage = this.getImageFromBase64(
      this.user.user.image.type,
      this.user.user.image.image
    );
    this.breadCrumbItems = [
      { label: "Contacts" },
      { label: "Profile", active: true },
    ];

    // fetches the data
    this._fetchData();
  }

  /**
   * Fetches the data
   */
  private _fetchData() {
    this.revenueBarChart = revenueBarChart;
    this.statData = statData;
  }
}
