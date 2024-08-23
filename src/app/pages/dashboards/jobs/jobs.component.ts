import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { ChartType } from "./jobs.model";
import {
  jobViewChart,
  ApplicationChart,
  ApprovedChart,
  RejectedChart,
  emailSentBarChart,
  vacancyData,
  receivedTimeChart,
  recentJobsData,
} from "./data";
import { ChartComponent } from "ng-apexcharts";
import { LocalService } from "src/app/core/services/local.service";
import { User } from "src/app/store/Authentication/auth.models";
import { UtilsService } from "src/app/shared/utils/utils.service";

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"],
})

/**
 * Jobs Component
 */
export class JobsComponent implements OnInit {
  userConnected: User;
  imageUserConnected: any;
  isDropup: boolean = true;
  constructor(
    private localService: LocalService,
    private utilService: UtilsService
  ) {}

  jobViewChart: ChartType;
  ApplicationChart: ChartType;
  ApprovedChart: ChartType;
  RejectedChart: ChartType;
  emailSentBarChart: ChartType;
  showNavigationArrows: any;
  showNavigationIndicators: any;
  vacancyData: any;
  receivedTimeChart: ChartType;
  recentJobsData: any;
  isActive: string;

  @ViewChild("chart", { static: false }) chart: ChartComponent;

  ngOnInit(): void {
    this.getUserConnected();
    this._fetchData();
  }

  private _fetchData() {
    this.jobViewChart = jobViewChart;
    this.ApplicationChart = ApplicationChart;
    this.ApprovedChart = ApprovedChart;
    this.RejectedChart = RejectedChart;
    this.emailSentBarChart = emailSentBarChart;
    this.vacancyData = vacancyData;
    this.receivedTimeChart = receivedTimeChart;
    this.recentJobsData = recentJobsData;
  }
  // on click chart render
  weeklyreport() {
    this.isActive = "week";
    this.emailSentBarChart.series = [
      {
        name: "Series A",
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
      },
      {
        name: "Series B",
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
      },
      {
        name: "Series C",
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
      },
    ];
  }

  monthlyreport() {
    this.isActive = "month";
    this.emailSentBarChart.series = [
      {
        name: "Series A",
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
      },
      {
        name: "Series B",
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
      },
      {
        name: "Series C",
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
      },
    ];
  }

  yearlyreport() {
    this.isActive = "year";
    this.emailSentBarChart.series = [
      {
        name: "Series A",
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22],
      },
      {
        name: "Series B",
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18],
      },
      {
        name: "Series C",
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48],
      },
    ];
  }

  // updateOptions(option: any) {
  //   this.activeOptionButton = option;
  //   this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  // }

  getUserConnected() {
    this.userConnected = this.localService.getDataJson("user");

    if (this.userConnected.image) {
      this.imageUserConnected = this.utilService.getImageFromBase64(
        this.userConnected.image.type,
        this.userConnected.image.image
      );
    } else {
      this.imageUserConnected = "assets/images/user.png";
    }
  }

  public emailSentPieChart = {
    series: [44, 55, 13, 43],
    chart: {
      type: "pie",
      height: 350,
    },
    labels: ["A", "B", "C", "D"],
    legend: {
      position: "bottom",
    },
    colors: ["#FF4560", "#00E396", "#008FFB", "#775DD0"],
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
      },
    },
  };
}
