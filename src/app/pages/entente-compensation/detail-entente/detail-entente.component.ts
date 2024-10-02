import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LocalService } from "src/app/core/services/local.service";

@Component({
  selector: "app-detail-entente",
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: "./detail-entente.component.html",
  styleUrl: "./detail-entente.component.css",
})
export class DetailEntenteComponent implements OnInit {
  imageDefautSignature = 'assets/images/noImage.png';
  entente: any;
  userConnected :any;
  projectName: string;
  constructor(private localservice: LocalService) {}
  ngOnInit(): void {
    this.entente = this.localservice.getDataJson("entente");
    this.userConnected = this.localservice.getDataJson("user");
    this.projectName = this.userConnected.projects[0].libelle;
    console.log("cette entente",this.entente);
    console.log("userConnected",this.projectName);

  }
}
