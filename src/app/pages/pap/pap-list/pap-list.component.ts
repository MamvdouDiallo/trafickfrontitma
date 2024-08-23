import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  ButtonAction,
  TableauComponent,
} from "src/app/shared/tableau/tableau.component";
import { UIModule } from "../../../shared/ui/ui.module";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { FormsModule, UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { AngularMaterialModule } from "src/app/shared/angular-materiel-module/angular-materiel-module";
import { TesterComponent } from "../../tester/tester.component";
import { SnackBarService } from "src/app/shared/core/snackBar.service";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import * as XLSX from "xlsx";
import { PapAddComponent } from "../pap-add/pap-add.component";
import { Pap, ResponsePap } from "../pap.model";
import { PapService } from "../pap.service";
import { ServiceParent } from "src/app/core/services/serviceParent";
import { DatatableComponent } from "src/app/shared/datatable/datatable.component";
import { ToastrService } from "ngx-toastr";
import { SharedService } from "../../projects/shared.service";
import { LocalService } from "src/app/core/services/local.service";
import { CoreService } from "src/app/shared/core/core.service";
import * as moment from "moment";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { logoItma } from "src/app/shared/logoItma";
import { ExportService } from "src/app/shared/core/export.service";
import { RechercheService } from "src/app/core/services/recherche.service";
import { JuristAppComponent } from "../../jurist-app/jurist-app.component";
import { BatimentComponent } from "../batiment/batiment.component";

@Component({
  selector: "app-pap-list",
  templateUrl: "./pap-list.component.html",
  styleUrl: "./pap-list.component.css",
  standalone: true,
  providers: [
    {
      provide: MatDialogRef,
      useValue: [],
    },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatPaginatorIntl },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "outline" },
    },
    ExportService,
  ],
  imports: [
    TableauComponent,
    UIModule,
    AngularMaterialModule,
    DatatableComponent,
    JuristAppComponent,
    BatimentComponent,
    FormsModule,
  ],
})
export class PapListComponent implements OnInit {
  [x: string]: any;

  listPap: Pap[];
  filterTable($event: any) {}
  breadCrumbItems: Array<{}>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  informations: any;
  displayedColumns: any;
  searchList: any;
  codeEnvoye: number; //code envoye par notre menu
  hasList: boolean;
  hasAdd: boolean;
  hasUpdate: boolean;
  hasDelete: boolean;
  hasDetail: boolean;
  length = 100;
  searchForm: UntypedFormGroup;
  dialogRef: any;
  dataSource: MatTableDataSource<any>;
  datas = [];
  deleteUser: boolean = false;
  currentIndex;
  loadData: boolean = false;
  exporter: boolean = false;
  isCollapsed: boolean = false;
  isSearch2: boolean = false;
  isSearch: boolean = false;
  rechercher = "";
  showLoader = "isNotShow";
  message = "";
  config: any;
  isLoading: boolean = false;
  pageSizeOptions = [5, 10, 25, 100, 500, 1000];
  pageSize: number = 10;
  pageIndex: number = 0;
  //constantes = CONSTANTES;
  userConnecter;
  offset: number = 0;
  title: string = "Gestion des partis affectés";
  url: string = "personneAffectes";
  panelOpenState = false;
  img;

  image;
  privilegeByRole: any; //liste des codes recu de l'api lors de la connexion
  privilegeForPage: number = 2520; //code privilege envoye pour afficher la page
  privilegePage;
  headers: any = [];
  btnActions: any = [];
  currentUser: any;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private _router: Router,
    private datePipe: DatePipe,
    private snackbar: SnackBarService,
    private _matDialog: MatDialog,
    private papService: PapService,
    private parentService: ServiceParent,
    public matDialogRef: MatDialogRef<PapAddComponent>,
    private _changeDetectorRef: ChangeDetectorRef,
    public toastr: ToastrService,
    private sharedService: SharedService,
    private localService: LocalService,
    private coreService: CoreService,
    private exportService: ExportService,
    private rechercherService: RechercheService
  ) {
    this.currentUser = this.localService.getDataJson("user");

    console.log("user connecter", this.currentUser);
    this.informations = {
      exportFile: ["excel", "pdf"],
      titleFile: "liste des pap",
      code: "01410",
      tabHead: ["Prénom", "Nom", "Nationalité"],
      tabFileHead: [
        "Prénom",
        "Nom",
        "Nationalité",
        "Numéro identification",
        "Téléphone",
        "Situation Matrimoniale",
        "Statut",
        "Pays",
        "Région",
        "Localité de résidance",
      ],
      searchFields: [],
      tabBody: ["prenom", "nom", "nationalite"],
      tabFileBody: [
        "prenom",
        "nom",
        "nationalite",
        "numeroIdentification",
        "numeroTelephone",
        "situationMatrimoniale",
        "statutPap",
        "pays",
        "region",
        "localiteResidence",
      ],
      action: [
        { name: "modifier", icon: "edit", color: "primary" },
        {
          name: "supprimer",
          icon: "delete",
          color: "red",
        },
        { name: "detail", icon: "detail", color: "red" },
      ],
    };
    //
    this.displayedColumns = this.informations.tabBody;
  }

  selectedOption: string = "";
  ngOnInit(): void {
    console.log("Valeur sélectionnée :", this.selectedOption);
    this.breadCrumbItems = [
      { label: "Pap" },
      { label: "Pap List", active: true },
    ];
    this.getPap();
    this.headers = this.createHeader();
    this.btnActions = this.createActions();
    // if (this.privilegePage) {
    //   this.getList();
    // //  this.checkCodePrivilegeForRole();

    // }
  }

  // checkCodePrivilegeForRole() {
  //   this.hasList =
  //     this.privilegeByRole.indexOf("0" + (this.privilegeForPage + 1)) != -1;
  //   this.hasAdd =
  //     this.privilegeByRole.indexOf("0" + (this.privilegeForPage + 2)) != -1;
  //   this.hasUpdate =
  //     this.privilegeByRole.indexOf("0" + (this.privilegeForPage + 3)) != -1;
  //   this.hasDelete =
  //     this.privilegeByRole.indexOf("0" + (this.privilegeForPage + 4)) != -1;
  //   this.hasDetail =
  //     this.privilegeByRole.indexOf("0" + (this.privilegeForPage + 5)) != -1;
  // }

  createHeader() {
    return [
      {
        th: "ID_PAP",
        td: "idPap",
      },
      {
        th: "PRENOM",
        td: "prenom",
      },
      {
        th: "NOM",
        td: "nom",
      },
      {
        th: "NATIONALITE",
        td: "nationalite",
      },
      {
        th: "IDENTIFICATION_PAP",
        td: "numeroIdentification",
      },
    ];
  }

  createActions(): ButtonAction[] {
    return [
      {
        icon: "bxs-edit",
        couleur: "green",
        size: "icon-size-4",
        title: "Modifier",
        isDisabled: this.hasUpdate,
        action: (element?) => this.updateItems(element),
      },
      {
        icon: "bxs-trash-alt",
        couleur: "red",
        size: "icon-size-4",
        title: "Supprimer",
        isDisabled: this.hasDelete,
        action: (element?) => this.supprimerItems(element.id, element),
      },
      {
        icon: "bxs-info-circle",
        couleur: "#00bfff	",
        size: "icon-size-4",
        title: "détail",
        isDisabled: this.hasDelete,
        action: (element?) => this.detailItems(element.id, element),
      },
    ];
  }

  getPap() {
    return this.parentService
      .list("personneAffectes", this.pageSize, this.offset)
      .subscribe(
        (data: any) => {
          this.loadData = false;
          if (data["responseCode"] == 200) {
            this.loadData = false;
            console.log(data);
            this.dataSource = new MatTableDataSource(data["data"]);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.datas = data["data"];
            this.length = data["length"];
            console.log("length", this.length);
            this._changeDetectorRef.markForCheck();
          } else {
            this.loadData = false;
            this.dataSource = new MatTableDataSource();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  pageChanged(event) {
    console.log(event);
    this.datas = [];
    this._changeDetectorRef.markForCheck();
    console.log(event.pageIndex);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.offset = this.pageIndex;
    this.getPap();
  }

  updateItems(information): void {
    console.log(information);
    this.snackbar.openModal(
      PapAddComponent,
      "50rem",
      "edit",
      "",
      information,
      "",
      () => {
        this.getList();
      }
    );
  }

  //cette fonction permet de supprimer
  supprimerItems(id, information) {
    console.log("====================================");
    console.log(id);
    console.log("====================================");
    this.snackbar
      .showConfirmation("Voulez-vous vraiment supprimer ce parti affecté ?")
      .then((result) => {
        if (result["value"] == true) {
          this.deleteUser = true;
          this.currentIndex = information;
          this.showLoader = "isShow";
          const message = "Parti affecté supprimé";
          this.coreService.deleteItem(id, this.url).subscribe(
            (resp) => {
              this.showLoader = "isNotShow";
              this.coreService
                .list(this.url, this.offset, this.pageSize)
                .subscribe((resp: any) => {
                  const data = resp["data"] || resp;
                  this.dataSource = new MatTableDataSource(data);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
                  this.deleteUser = false;
                  this.datas = resp["data"] || data;
                  this.length = resp["total"] || data.length;
                  this.changeDetectorRefs.markForCheck();
                  this.changeDetectorRefs.detectChanges();
                  this.snackbar.openSnackBar(message + " avec succès", "OK", [
                    "mycssSnackbarGreen",
                  ]);
                });
            },
            (error) => {
              this.showLoader = "isNotShow";
              this.deleteUser = false;
              this.snackbar.showErrors(error);
            }
          );
        }
      });
  }

  filterList() {
    this.isCollapsed = !this.isCollapsed;
  }

  //cette fonction permet d'exporter la liste sous format excel ou pdf
  exportAs(format) {
    let nom = this.informations.titleFile;
    let value = [];
    this.parentService.list("personneAffectes", 1000000000, 0).subscribe(
      (resp) => {
        if (resp["responseCode"] == 200) {
          value = resp["data"];
          if (value.length != 0) {
            let user = { prenom: "admin", nom: "admin" };
            if (format == "pdf") {
              let donne = this.exempleGenPdfHeaderFooter(
                user.prenom + " " + user.nom,
                nom
              );
              var doc = donne.doc;
              var col = this.informations.tabFileHead;
              var rows = [];
              for (const item of value) {
                const itemCurrent = item;
                const tabField = [];
                const elementKeys = Object.keys(item);
                let i = 0;

                for (const field of this.informations.tabFileBody) {
                  for (const element of elementKeys) {
                    if (field === element) {
                      if (
                        [
                          "createdAt",
                          "dateNaiss",
                          "dateCirculation",
                          "dateDepart",
                          "dateDarriver",
                        ].includes(field)
                      ) {
                        // Si le champ est une date, formater et ajouter à tabField
                        tabField.push(
                          moment(itemCurrent[field]).format("DD/MM/YYYY") || ""
                        );
                      } else {
                        if (
                          typeof itemCurrent[field] === "object" &&
                          itemCurrent[field] !== null
                        ) {
                          // Si c'est un objet non null, ajouter 'libelle' ou 'nom'
                          tabField.push(
                            itemCurrent[field]["libelle"] ||
                              itemCurrent[field]["nom"] ||
                              itemCurrent[field]["description"] ||
                              itemCurrent[field]["libellePays"]
                          );
                        } else {
                          // Sinon, ajouter la valeur ou une chaîne vide
                          tabField.push(itemCurrent[field] || "");
                        }
                      }
                    }
                  }
                  i++;
                }
                // Ajouter tabField au tableau des lignes
                rows.push(tabField);
              }

              autoTable(doc, { head: [col], body: rows });
              doc.save(nom + ".pdf");
              this.snackbar.openSnackBar("Téléchargement réussi", "OK", [
                "mycssSnackbarGreen",
              ]);
              this.exporter = false;
            } else if (format == "excel") {
              var col = this.informations.tabFileHead;
              var rows = [];
              var itemCurrent;
              for (var item of value) {
                itemCurrent = item;
                let tabField = [];
                let elementKeys = Object.keys(item);
                let i = 0;
                for (let field of this.informations.tabFileBody) {
                  for (let element of elementKeys) {
                    if (element.toString() == field.toString()) {
                      if (
                        field == "createdAt" ||
                        field == "dateNaiss" ||
                        field == "dateCirculation" ||
                        field == "dateDepart" ||
                        field == "dateDarriver"
                      )
                        tabField.push({
                          [this.informations.tabFileHead[i]]:
                            moment(itemCurrent[field]).format("DD/MM/YYYY") ||
                            "",
                        });
                      else {
                        if (
                          typeof itemCurrent[field] === "object" &&
                          itemCurrent[field] !== null
                        ) {
                          let fieldValue =
                            itemCurrent[field]["libelle"] ||
                            itemCurrent[field]["nom"] ||
                            itemCurrent[field]["libellePays"] ||
                            "";
                          let fieldName = this.informations.tabFileHead[i];

                          tabField.push({
                            [fieldName]: fieldValue,
                          });
                        } else {
                          tabField.push({
                            [this.informations.tabFileHead[i]]:
                              itemCurrent[field] || "",
                          });
                        }
                      }
                    }
                  }
                  i++;
                }
                rows.push(Object.assign({}, ...tabField));
              }
              this.exportService.exportAsExcelFile(
                this.exportService.preFormatLoanInfo(rows),
                nom
              );
              this.snackbar.openSnackBar("Téléchargement réussi", "OK", [
                "mycssSnackbarGreen",
              ]);
              this.exporter = false;
            }
          } else {
            this.snackbar.openSnackBar("La liste est vide!!!", "OK", [
              "mycssSnackbarRed",
            ]);
          }
        } else {
          this.loadData = false;
        }
      },
      (error) => {
        this.snackbar.showErrors(error);
      }
    );
  }

  exempleGenPdfHeaderFooter(userName, fileName) {
    const toDay = new Date();
    let marginX = 0;
    const doc = new jsPDF();
    const totalPagesExp = "{total_pages_count_string}";
    doc.setFillColor(0, 0, 255);
    const columns = [
      "                     ",
      fileName,
      " Date du :" + this.datePipe.transform(toDay, "dd/MM/yyyy"),
    ];
    const rows = [];
    autoTable(doc, {
      head: [columns],
      body: rows,
      theme: "grid",
      margin: {
        top: 10,
      },
      didDrawCell: function (data) {
        if (data.row.section === "head" && data.column.index === 1) {
          data.cell.styles.textColor = [51, 22, 183];
          data.cell.styles.fontSize = 10;
          data.cell.styles.valign = "middle";
          data.cell.styles.fillColor = [216, 78, 75];
        }
        if (data.row.section === "head" && data.column.index === 0) {
          doc.addImage(
            logoItma,
            "JPEG",
            data.cell.x + 2,
            data.cell.y + 2,
            30,
            15
          );
        }
      },
      didDrawPage: function (data) {
        marginX = data.settings.margin.left;
        // Header
        doc.setFontSize(10);
        doc.setTextColor(255);
      },
      styles: {
        lineColor: [0, 0, 0],
        lineWidth: 0.3,
        textColor: [51, 122, 183],
      },
      headStyles: {
        fillColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: "normal",
        valign: "middle",
        textColor: 0,
        minCellHeight: 20,
      },
      willDrawCell: function (data) {
        if (data.row.section === "head") {
          doc.setTextColor(51, 122, 183);
        }
        if (data.row.section === "head" && data.column.index === 1) {
          doc.setFontSize(10);
        }
      },
    });
    return { doc: doc, marginX: marginX, totalPagesExp: totalPagesExp };
  }

  record(item) {}

  addItems(): void {
    this.snackbar.openModal(
      PapAddComponent,
      "55rem",
      "new",
      "",
      this.datas,
      "",
      () => {
        this.getList();
      }
    );
  }

  convertedJson: string;

  fileUpload(event: any) {
    console.log(event.target.files);
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      console.log(event);
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        const worksheet = workbook.Sheets[sheet];
        const data: any[][] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        }) as any[][];
        const headers = data[0];
        this.headings = headers;
        const jsonData = data.slice(1).map((row: any[]) => {
          let obj: any = {};
          headers.forEach((header: string, index: number) => {
            obj[header] = row[index];
          });
          return obj;
        });
        this.dataExcel = jsonData;
        //this.convertedJson = JSON.stringify(jsonData, undefined, 4);
      });
    };
  }

  headings = [];
  dataExcel = [];

  resetDataFromExcel() {
    this.headings = [];
    this.dataExcel = [];
    this.convertedJson = "";
  }

  triggerFileUpload() {
    const fileUploadElement = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileUploadElement) {
      fileUploadElement.click();
    }
  }

  importData() {
    if (this.selectedOption != "") {
      this.importDatas(this.selectedOption);
    } else {
      // Ajout de la clé "project_id" à chaque élément de this.dataExcel
      const dataToSend = this.dataExcel.map((item) => ({
        ...item,
        project_id: +this.currentUser.projects[0]?.id,
      }));

      console.log(dataToSend);
      return this.papService
        .add("personneAffectes/importer", dataToSend)
        .subscribe(
          (data: any) => {
            console.log(data);
            this.toastr.success(data.message);
            this.dataExcel = [];
            this.getPap();
          },
          (err) => {
            this.toastr.error(err);
          }
        );
    }
  }

  importDatas(params:string) {
    return this.papService.add(`${params} `, this.dataExcel).subscribe(
      (data:any) => {
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        this.toastr.success(data.message);
        this.dataExcel = [];
      },
      (err) => {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        this.toastr.error(err);
      }
    );
  }



  onOptionSelected() {
    console.log("Valeur sélectionnée :", this.selectedOption);
  }

  detailItems(id, information) {
    console.log(information);
    this.localService.saveDataJson("pap", information);
    this.sharedService.setSelectedItem(information);
    this._router.navigate(["pap/detail"]);
  }
}
