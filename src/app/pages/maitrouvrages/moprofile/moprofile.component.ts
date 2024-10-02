import { Component, OnInit, inject } from "@angular/core";

import { revenueBarChart, statData } from "./data";

import { ChartType } from "./profile.model";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { Auth } from "src/app/store/Authentication/auth.models";
import { ActivatedRoute } from "@angular/router";
import { MoService } from "src/app/core/services/mo.service";
import { Mo, ResponseData } from "src/app/shared/models/Projet.model";
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
  user: Auth;

  profileId: number;

  myImage: string;
  revenueBarChart: ChartType;
  statData: any;
  constructor(private route: ActivatedRoute, private moservice: MoService) {}

  Detailuser?: Mo={
    checked: "",
    projects: []
  } ;
  ngOnInit() {
    this.user = this.authService.currentUser();
    this.profileId = +this.route.snapshot.paramMap.get("id");

    this.moservice.getById(this.profileId, "users").subscribe(
      (data: ResponseData<Mo>) => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        this.Detailuser = data.data;
        console.log("====================================");
        console.log(this.Detailuser);
        console.log("====================================");
      },
      (err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
      }
    );
    this.myImage = this.getImageFromBase64(
      this.user.user.image.type,
      this.user.user.image.image
    );
    this.breadCrumbItems = [
      
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
