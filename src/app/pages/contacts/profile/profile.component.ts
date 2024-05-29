import { Component, OnInit, inject } from "@angular/core";

import { revenueBarChart, statData } from "./data";

import { ChartType } from "./profile.model";
import { AuthenticationService } from "src/app/core/services/auth.service";
import { Auth, User } from "src/app/store/Authentication/auth.models";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})

/**
 * Contacts-profile component
 */
export class ProfileComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  getImageFromBase64(imageType: string, imageName: number[]): string {
    const base64Representation = "data:" + imageType + ";base64," + imageName;
    return base64Representation;
  }

  private authService = inject(AuthenticationService);
  user: Auth;

  myImage: string;
  revenueBarChart: ChartType;
  statData: any;
  constructor() {}

  ngOnInit() {
    this.user = this.authService.currentUser();
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
