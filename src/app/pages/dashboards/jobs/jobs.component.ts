import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { ChartType } from "./jobs.model";

import { ChartComponent } from "ng-apexcharts";
import { LocalService } from "src/app/core/services/local.service";
import { User } from "src/app/store/Authentication/auth.models";
import { UtilsService } from "src/app/shared/utils/utils.service";
import { ServiceParent } from "src/app/core/services/serviceParent";
import { SnackBarService } from "src/app/shared/core/snackBar.service";
import { ListPvComponent } from "../list-pv/list-pv.component";
import { Project } from "../../projects/project.model";

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
  pageSize: number = 10000;
  pageIndex: number = 0;
  offset: number = 0;
  loadData: boolean = false;

  lengthPap: number;
  lengthPip: number;
  lengthPlainte: number;

  listPlainte: any[] = [];

  public listPap: any[] = [];
  public vulnerabilityCounts = {
    vulnerable: 0,
    nonVulnerable: 0,
  };

  constructor(
    private localService: LocalService,
    private utilService: UtilsService,
    private parentService: ServiceParent,
    private snackbar: SnackBarService
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
  DetailProject = {
    fichiers: [
      {
        fichierUrl: 'https://example.com/fichier1.doc',
        fichierName: 'Document 1',
      },
      {
        fichierUrl: 'https://example.com/fichier2.pdf',
        fichierName: 'Report 2024',
      },
      {
        fichierUrl: 'https://example.com/fichier3.ppt',
        fichierName: 'Presentation Final',
      }
    ]
  };


  @ViewChild("chart", { static: false }) chart: ChartComponent;

  ngOnInit(): void {
    this.getUserConnected();
    this.getPap();
    this.getPip();
    this.getPlainte();
  }

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

  getPap() {
    return this.parentService
      .list("personneAffectes", this.pageSize, this.offset)
      .subscribe(
        (data: any) => {
          this.loadData = false;
          if (data["responseCode"] == 200) {
            this.listPap = data.data;
            this.lengthPap = this.listPap.length;

            // Classifier les données après les avoir récupérées
            this.classifyVulnerability();
            this.vulnerabilityChart.series = [
              this.vulnerabilityCounts.vulnerable,
              this.vulnerabilityCounts.nonVulnerable,
            ];
          } else {
            this.loadData = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  classifyVulnerability(): void {
    if (this.listPap && this.listPap.length > 0) {
      this.listPap.forEach((pap) => {
        if (pap.statutVulnerable === "Oui") {
          this.vulnerabilityCounts.vulnerable++;
        } else if (pap.statutVulnerable === "Non") {
          this.vulnerabilityCounts.nonVulnerable++;
        }
      });
    } else {
      console.error(
        "Aucune donnée disponible pour classifier la vulnérabilité des PAP."
      );
    }

    console.log("Vulnérable:", this.vulnerabilityCounts.vulnerable);
    console.log("Non Vulnérable:", this.vulnerabilityCounts.nonVulnerable);
  }

  public vulnerabilityChart = {
    series: [], // Les données du graphique seront définies dynamiquement
    chart: {
      type: "pie", // Graphique en secteurs
      height: 350,
    },
    labels: ["Vulnérable", "Non Vulnérable"], // Les étiquettes pour les différents statuts
    colors: ["#dc3545", "#28a745"], // Couleurs pour chaque statut
    legend: {
      position: "bottom",
    },
  };

  getPip() {
    this.loadData = true;
    return this.parentService
      .list("partie-interesse", this.pageSize, this.offset)
      .subscribe(
        (data: any) => {
          this.loadData = false;
          if (data["responseCode"] == 200) {
            console.log(data);
            this.loadData = false;
            this.lengthPip = data.length;
            console.log(data);
          } else {
            this.loadData = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  //

  getPlainte() {
    return this.parentService
      .list("plaintes", this.pageSize, this.offset)
      .subscribe(
        (data: any) => {
          this.loadData = false;
          if (data["responseCode"] == 200) {
            this.loadData = false;
            this.lengthPlainte = data.length;
            this.listPlainte = data.data;

            console.log("listePlainte", this.listPlainte);

            // Appel de la méthode de classification des plaintes après le remplissage de `listPlainte`
            this.classifyComplaints();

            // Mise à jour du graphique avec les nouvelles données
            this.complaintChart.series = [
              this.complaintCounts.resolu,
              this.complaintCounts.enAttente,
              this.complaintCounts.enCours,
            ];
          } else {
            this.loadData = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  public complaintCounts = {
    resolu: 0,
    enAttente: 0,
    enCours: 0,
  };

  classifyComplaints(): void {
    console.log("pli", this.listPlainte);
    if (this.listPlainte && this.listPlainte.length > 0) {
      this.listPlainte.forEach((complaint) => {
        if (complaint.etat === "Résolu") {
          this.complaintCounts.resolu++;
        } else if (complaint.etat === "EnAttente") {
          this.complaintCounts.enAttente++;
        } else if (complaint.etat === "Encours") {
          this.complaintCounts.enCours++;
        }
      });
    } else {
      console.error("Aucune donnée disponible pour classifier les plaintes.");
    }
  }

  public complaintChart = {
    series: [],
    chart: {
      type: "pie", // Graphique en secteurs
      height: 350,
    },
    labels: ["Résolu", "En Attente", "En Cours"], // Les étiquettes pour les différents états
    colors: ["#28a745", "#ffc107", "#007bff"], // Couleurs pour chaque état
    legend: {
      position: "bottom",
    },
  };

  //engagements

  engagements = [
    {
      type: "Réunion d'information Konia",
      date: "28/12/2022",
      reference: "PV 1 PAR3 Réunion comm. Konia",
    },
    {
      type: "PAR3 signature ordre de mission",
      date: "29/12/2022",
      reference: "PV 2 PAR3 signature ordre de mission",
    },
    {
      type: "Réunion d'information Balla Kayati",
      date: "29/12/2022",
      reference: "PV 3 PAR3 Réunion Balla Kayati",
    },
    {
      type: "Réunion d'information Malapoouya",
      date: "29/12/2022",
      reference: "PV 4 PAR3 réunion Malapoouya",
    },
    {
      type: "Profil Socio-économique Horè Gouba",
      date: "30/12/2022",
      reference: "PV 5 Profil Socio-économique Horè Gouba rev_Ro",
    },
    {
      type: "Profil Socio-économique Kissaka PAR3",
      date: "30/12/2022",
      reference: "PV 6 Profil Socio-économique Kissaka PAR3 rev_Ro",
    },
    {
      type: "Profil Socio-économique Djolol PAR3",
      date: "30/12/2022",
      reference: "PV 7 Profil Socio-économique Djolol PAR3 rev_Ro",
    },
    {
      type: "Focus group Horè Bhoundou PAR3",
      date: "03/01/2023",
      reference: "PV 8 Focus group Horè Bhoundou PAR3 rev_Ro",
    },
    {
      type: "Profil Socio-économique Horè Kintaou PAR3",
      date: "04/01/2023",
      reference: "PV 9 Profil Socio-économique Horè Kintaou PAR3 rev_Ro",
    },
    {
      type: "Focus group N'dantari Ley API DM PAR3",
      date: "04/01/2023",
      reference: "PV 10 Focus group N'dantari Ley API DM PAR3 rev_Ro",
    },
    {
      type: "Réunion d'information N'dantari Dow",
      date: "04/01/2023",
      reference: "PV 11 N'dantari Dow rev_Ro",
    },
    {
      type: "Focus group Marga",
      date: "04/01/2023",
      reference: "PV 12 Focus group Marga rev_Ro",
    },
    {
      type: "Focus group Telirè",
      date: "05/01/2023",
      reference: "PV 13 Focus group Telirè rev_Ro",
    },
    {
      type: "Focus group Fakerè",
      date: "06/01/2023",
      reference: "PV 14 Focus group Fakerè rev_Ro",
    },
    {
      type: "Focus group Hakkoudhè Tchandhi",
      date: "06/01/2023",
      reference: "PV 15 Focus group Hakkoudhè Tchandhi rev_Ro",
    },
    {
      type: "Focus group Djohèrè",
      date: "16/01/2023",
      reference: "PV 16 Focus group Djohèrè",
    },
    {
      type: "Focus group Balla Dabi",
      date: "06/01/2023",
      reference: "PV 17 Focus group Balla Dabi",
    },
    {
      type: "Focus group Balla Kayati",
      date: "16/01/2023",
      reference: "PV 18 Focus group Balla Kayati",
    },
    {
      type: "Identification des sites de relocalisation de Horè Gouba",
      date: "23/01/2023",
      reference:
        "PV 19 Identification des sites de relocalisation de Horè Gouba rev_Ro (1)",
    },
  ];

  page = 1;

  viewPV(reference: string): void {
    this.snackbar.openModal(
      ListPvComponent,
      "45rem",
      "new",
      "",
      reference,
      "",
      () => {}
    );
  }

  getFileName(url: string): string {
    return url.substring(url.lastIndexOf('/') + 1);
  }
}
