import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-jurist-app",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./jurist-app.component.html",
  styleUrl: "./jurist-app.component.css",
})
export class JuristAppComponent {
  partners: any[] = [
    { libelle: "diango", logo: "assets/images/JuristApp/Django.png" },
    { libelle: "dojo", logo: "assets/images/JuristApp/DojoToolkit.png" },
    { libelle: "pipefy", logo: "assets/images/JuristApp/Pipefy.png" },
    { libelle: "portal", logo: "assets/images/JuristApp/Portal.png" },
    { libelle: "rackspace", logo: "assets/images/JuristApp/Rackspace.png" },
    { libelle: "temawork", logo: "assets/images/JuristApp/Teamwork.png" }

  ];
}
