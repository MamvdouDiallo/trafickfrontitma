import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatDrawer, MatSidenavModule } from "@angular/material/sidenav";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { CoreService } from "src/app/shared/core/core.service";
import { SnackBarService } from "src/app/shared/core/snackBar.service";
import { CONSTANTES } from "src/app/shared/models/constantes";
import { ClientVueService } from "../../admin/client-vue/client-vue.service";
import { MatDialog } from "@angular/material/dialog";
import { AngularMaterialModule } from "src/app/shared/angular-materiel-module/angular-materiel-module";
import { InfoClientComponent } from "../info-client/info-client.component";
import { SharedService } from "../../projects/shared.service";
import { LocalService } from "src/app/core/services/local.service";
import { SignatureClientComponent } from "../signature-client/signature-client.component";
import { environment } from "src/environments/environment";
import { PapService } from "../pap.service";
import { InfoPlainteComponent } from "../../plainte/palainte-detail/info-plainte/info-plainte.component";
import { PlainteFomuleComponent } from "../plainte-fomule/plainte-fomule.component";
import { CommunicationPapComponent } from "../communication-pap/communication-pap.component";
import { EntenteCompensationFormuleComponent } from "../entente-compensation-formule/entente-compensation-formule.component";
import { ListPlainteComponent } from "../../plainte/list-plainte/list-plainte.component";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  ButtonAction,
  TableauComponent,
} from "src/app/shared/tableau/tableau.component";

@Component({
  selector: "app-pap-detail",
  templateUrl: "./pap-detail.component.html",
  standalone: true,
  imports: [
    AngularMaterialModule,
    InfoClientComponent,
    InfoPlainteComponent,
    PlainteFomuleComponent,
    CommunicationPapComponent,
    EntenteCompensationFormuleComponent,
    ListPlainteComponent,
    TableauComponent
  ],
  styleUrl: "./pap-detail.component.css",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PapDetailComponent implements OnInit {
  @ViewChild("drawer") drawer: MatDrawer;
  panels: any[] = [];
  selectedPanel: string = "info-client";
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constantes = CONSTANTES;
  loader: boolean = false;
  drawerMode: "side" | "over";
  drawerOpened: boolean;
  menuData: any;
  privileges: any;
  data: any;
  paramsId: any;
  infosPap: any;
  isLoading = false;
  menuPP: any;
  menuPM: any;
  menuPMACTIONNAIRE: any;
  typeClient: boolean;
  noImage = "assets/images/noImage.png";
  imagePath = "";
  noImageStore = "";
  typePM;
  dialogRef: any;
  loaderImg: boolean = false;
  attributComplementaires: any = [];
  urlImage = environment.apiURL + "image/getFile/";

  pageSizeOptions = [5, 10, 25, 100, 500, 1000];
  pageSize: number = 10;
  pageIndex: number = 0;
  headers: any = [];
  btnActions: any = [];

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
  dataSource: MatTableDataSource<any>;
  datas = [];
  deleteUser: boolean = false;
  currentIndex;
  loadData: boolean = false;
  offset: number = 0;

  //urlImage=     'http://localhost:8080/image/getFile/';

  plaintes: any = [];

  batiments: any[] = [
    {
      id: 1,
      geo: "45.12345,-73.12345",
      codePap: "11111",
      codeRevise: "REV001",
      codeBatiment: "BAT001",
      contour: "Rectangular",
      typeBatiment: "Residential",
      nombrePiece: 4,
      nombrePieceUtilise: 3,
      etatBatiment: "Bon",
      natureSol: "Béton",
      structureMur: "Brique",
      typeToiture: "Ardoise",
      autreTypeToiture: null,
      porteFentre: "Oui",
      propriete: "Privée",
      infoComplementaire: "Aucune",
      decriptionBatiment: "Maison familiale",
      parentcle: null,
      cle: null,
      childcle: null,
    },
    {
      id: 2,
      geo: "46.12345,-74.12345",
      codePap: "22222",
      codeRevise: "REV002",
      codeBatiment: "BAT002",
      contour: "Carré",
      typeBatiment: "Commercial",
      nombrePiece: 5,
      nombrePieceUtilise: 4,
      etatBatiment: "Très bon",
      natureSol: "Carrelage",
      structureMur: "Béton",
      typeToiture: "Métal",
      autreTypeToiture: "Zinc",
      porteFentre: "Non",
      propriete: "Publique",
      infoComplementaire: "Bâtiment utilisé pour des bureaux",
      decriptionBatiment: "Bureau commercial",
      parentcle: null,
      cle: null,
      childcle: null,
    },
    {
      id: 3,
      geo: "45.12345,-73.12345",
      codePap: "11111",
      codeRevise: "REV001",
      codeBatiment: "BAT001",
      contour: "Rectangular",
      typeBatiment: "Residential",
      nombrePiece: 4,
      nombrePieceUtilise: 3,
      etatBatiment: "Bon",
      natureSol: "Béton",
      structureMur: "Brique",
      typeToiture: "Ardoise",
      autreTypeToiture: null,
      porteFentre: "Oui",
      propriete: "Privée",
      infoComplementaire: "Aucune",
      decriptionBatiment: "Maison familiale",
      parentcle: null,
      cle: null,
      childcle: null,
    },
    {
      id: 4,
      geo: "46.12345,-74.12345",
      codePap: "22222",
      codeRevise: "REV002",
      codeBatiment: "BAT002",
      contour: "Carré",
      typeBatiment: "Commercial",
      nombrePiece: 5,
      nombrePieceUtilise: 4,
      etatBatiment: "Très bon",
      natureSol: "Carrelage",
      structureMur: "Béton",
      typeToiture: "Métal",
      autreTypeToiture: "Zinc",
      porteFentre: "Non",
      propriete: "Publique",
      infoComplementaire: "Bâtiment utilisé pour des bureaux",
      decriptionBatiment: "Bureau commercial",
      parentcle: null,
      cle: null,
      childcle: null,
    },
  ];
  equipements: any[] = [
    {
      id: 1,
      geo: "12.3456, -7.8910",
      codePap: "11111",
      codeEquipement: "EQ001",
      nombreEquipement: 5,
      count: 3,
      photo: "photo_url",
      typeEquipement: "Type A",
      etatEquipement: "Bon",
      proprietaire: "John Doe",
      infoComplementaire: "Aucun",
      parentcle: "parent_001",
      cle: "key_001",
      childcle: "child_001",
    },
    {
      id: 2,
      geo: "23.4567, -8.9101",
      codePap: "22222",
      codeEquipement: "EQ002",
      nombreEquipement: 2,
      count: 1,
      photo: "photo_url_2",
      typeEquipement: "Type B",
      etatEquipement: "Mauvais",
      proprietaire: "Jane Doe",
      infoComplementaire: "Réparations nécessaires",
      parentcle: "parent_002",
      cle: "key_002",
      childcle: "child_002",
    },
  ];
  coProprietaires: any[] = [
    {
      id: 7,
      prenomNom: "John Doe",
      contactTelephonique: "1234567890",
      codePap: "11111",
      codeCoProprietaire: "C001",
      sexe: "M",
      age: 35,
      situationMatrimoniale: "Marié",
      photo: "photoUrl",
      infoComplementaire: "Aucune",
    },
    {
      id: 8,
      prenomNom: "Jane Doe",
      contactTelephonique: "0987654321",
      codePap: "22222",
      codeCoProprietaire: "C002",
      sexe: "F",
      age: 30,
      situationMatrimoniale: "Célibataire",
      photo: "photoUrl",
      infoComplementaire: "Aucune",
    },
    {
      id: 9,
      prenomNom: "John Doe",
      contactTelephonique: "1234567890",
      codePap: "11111",
      codeCoProprietaire: "C001",
      sexe: "M",
      age: 35,
      situationMatrimoniale: "Marié",
      photo: "photoUrl",
      infoComplementaire: "Aucune",
    },
  ];

  betails: any[] = [
    {
      id: 1,
      codePap: "11111",
      typeBetails: "Type Exemple",
      description: "Description détaillée de Betails",
    },
    {
      id: 2,
      codePap: "22222",
      typeBetails: "Type Exemple",
      description: "Description détaillée de Betails",
    },
    {
      id: 3,
      codePap: "11111",
      typeBetails: "Type Exemple",
      description: "Description détaillée de Betails",
    },
    {
      id: 4,
      codePap: "22222",
      typeBetails: "Type Exemple",
      description: "Description détaillée de Betails",
    },
    {
      id: 5,
      codePap: "11111",
      typeBetails: "Type Exemple",
      description: "Description détaillée de Betails",
    },
    {
      id: 6,
      codePap: "22222",
      typeBetails: "Type Exemple",
      description: "Description détaillée de Betails",
    },
    {
      id: 7,
      codePap: "11111",
      typeBetails: "Type Exemple",
      description: "Description détaillée de Betails",
    },
  ];
  cultures: any[] = [
    {
      id: 1,
      codePap: "11111",
      typeCulture: "TypeA",
      description: "Description de la culture A",
    },
    {
      id: 2,
      codePap: "22222",
      typeCulture: "TypeB",
      description: "Description de la culture B",
    },
    {
      id: 3,
      codePap: "11111",
      typeCulture: "TypeA",
      description: "Description de la culture A",
    },
    {
      id: 4,
      codePap: "22222",
      typeCulture: "TypeB",
      description: "Description de la culture B",
    },
    {
      id: 5,
      codePap: "11111",
      typeCulture: "TypeA",
      description: "Description de la culture A",
    },
    {
      id: 6,
      codePap: "22222",
      typeCulture: "TypeB",
      description: "Description de la culture B",
    },
    {
      id: 7,
      codePap: "11111",
      typeCulture: "TypeA",
      description: "Description de la culture A",
    },
    {
      id: 8,
      codePap: "22222",
      typeCulture: "TypeB",
      description: "Description de la culture B",
    },
    {
      id: 9,
      codePap: "11111",
      typeCulture: "TypeA",
      description: "Description de la culture A",
    },
    {
      id: 10,
      codePap: "22222",
      typeCulture: "TypeB",
      description: "Description de la culture B",
    },
  ];
  polygones: any[];
  employes: any[] = [
    {
      id: 5,
      codePap: "11111",
      codeEmploye: "E001",
      numeroIdentifiant: "ID001",
      prenomNom: "Jean Dupont",
      contactTelephonique: "0701234567",
      categorieActivite: "Agriculture",
      sexe: "M",
      age: 35,
      nationalite: "Sénégal",
      qualiteEmploye: "Technicien",
      remuneration: 1200.0,
      prime: 150.0,
      handicap: "Non",
      parentcle: null,
      cle: null,
      childcle: null,
      infoComplementaire: "Aucune",
    },
    {
      id: 6,
      codePap: "11111",
      codeEmploye: "E001",
      numeroIdentifiant: "ID001",
      prenomNom: "Jean Dupont",
      contactTelephonique: "0701234567",
      categorieActivite: "Agriculture",
      sexe: "M",
      age: 35,
      nationalite: "Sénégal",
      qualiteEmploye: "Technicien",
      remuneration: 1200.0,
      prime: 150.0,
      handicap: "Non",
      parentcle: "PK001",
      cle: "K001",
      childcle: "CK001",
      infoComplementaire: "Aucune",
    },
    {
      id: 7,
      codePap: "11111",
      codeEmploye: "E001",
      numeroIdentifiant: "ID001",
      prenomNom: "Jean Dupont",
      contactTelephonique: "0701234567",
      categorieActivite: "Agriculture",
      sexe: "M",
      age: 35,
      nationalite: "Sénégal",
      qualiteEmploye: "Technicien",
      remuneration: 1200.0,
      prime: 150.0,
      handicap: "Non",
      parentcle: "PK001",
      cle: "K001",
      childcle: "CK001",
      infoComplementaire: "Aucune",
    },
  ];

  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    // private _fuseMediaWatcherService: FuseMediaWatcherService,
    private route: ActivatedRoute,
    private _router: Router,
    private coreService: CoreService,
    private snackbar: SnackBarService,
    private clientServive: ClientVueService,
    private _matDialog: MatDialog,
    private papservice: PapService,
    private localService: LocalService
  ) {
    this.menuData = [
      {
        title: "Actions liées",
        children: [
          {
            id: "info-client",
            title: "Personne affecté",
            icon: "heroicons_outline:user-group",
          },
          {
            id: "plainte",
            title: "Plaintes",
            icon: "heroicons_outline:user-group",
          },
          {
            id: "entente",
            title: "Ententes de compensation",
            icon: "heroicons_outline:users",
          },
        ],
      },
    ];

    this.route.params.subscribe((params) => {
      this.paramsId = params["id"];
    });
    // const panel = this.coreService.decriptDataToLocalStorage("CD-@--120");
    // this.selectedPanel = panel;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Setup available panels
    this.panels = [
      {
        id: "compte",
        icon: "heroicons_outline:user-circle",
        title: "Compte",
        description: "",
      },
      {
        id: "bureau",
        icon: "heroicons_outline:lock-closed",
        title: "Bureaux",
        description: "",
      },
      {
        id: "role",
        icon: "heroicons_outline:credit-card",
        title: "Rôle",
        description: "",
      },
      {
        id: "caisse",
        icon: "heroicons_outline:bell",
        title: "Caisse",
        description: "",
      },
      {
        id: "plafond",
        icon: "heroicons_outline:user-group",
        title: "Plafond",
        description: "",
      },
    ];
    this.getpap();

  }

  getAttributComplementaireClient(infosPap) {
    this.isLoading = true;
    const data = {
      natureAttribut: "CLIENT",
      referenceObjet: infosPap,
    };
    this.coreService
      .getAttributComplementaire(data, "attribut-complementaire/mine")
      .subscribe(
        (resp) => {
          if (
            resp[this.constantes.RESPONSE_CODE] ===
            this.constantes.HTTP_STATUS.SUCCESSFUL
          ) {
            this.isLoading = false;
            this.attributComplementaires = resp[this.constantes.RESPONSE_DATA];
            this._changeDetectorRef.markForCheck();
          } else {
            this.isLoading = false;
          }
        },
        () => {
          this.isLoading = false;
        }
      );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Navigate to the panel
   *
   * @param panel
   */
  goToPanel(panel: string): void {
    //this.coreService.encriptDataToLocalStorage("CD-@--129", null);
    this.selectedPanel = panel;

    console.log("====================================");
    console.log(this.selectedPanel);
    console.log("====================================");
    if (this.selectedPanel == "plainte") {
      this.headers = this.createHeaderPlainte();
      this.btnActions = this.createActionsPlainte();
      this.getPlainteByCodePap();
    } else if (this.selectedPanel == "entente") {
      this.headers = this.createHeaderEntente();
      this.btnActions = this.createActionsEntente();
      this.getEntenteByCodePap();
    }

    // Close the drawer on 'over' mode
    if (this.drawerMode === "over") {
      this.drawer.close();
    }
  }

  /**
   * Get the details of the panel
   *
   * @param id
   */

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getFirstElementWord(value) {
    if (value) {
      return value
        .match(/(?<=(\s|^))[a-z]/gi)
        .join("")
        .toUpperCase();
    }
  }

  changeClient(type, id): void {
    console.log(id);
    this.snackbar
      .showConfirmation("Voulez-vous vraiment marque ce pap comme dédommagé ?")
      .then((result) => {
        if (result["value"] == true) {
          this.isLoading = true;
          this.loader = true;
          //   let url;
          // let message;
          this.clientServive
            .updateEntity("personneAffectes/dedommagerPap", id, type)
            .subscribe(
              (response) => {
                this.isLoading = false;
                this.loader = false;
                this.snackbar.openSnackBar(response["message"], "OK", [
                  "mycssSnackbarGreen",
                ]);
                // this.getpap();
              },
              (error) => {
                this.isLoading = false;
                this.loader = false;
                this.snackbar.showErrors(error);
              }
            );
        }
      });
  }

  selectOnFile(evt, type, name) {
    let accept = [];
    let extension = "";
    if (type === "photo_profile") {
      accept = [".png", ".PNG", ".jpg", ".JPG"];
      extension = "une image";
    }
    for (const file of evt.target.files) {
      const index = file.name.lastIndexOf(".");
      const strsubstring = file.name.substring(index, file.name.length);
      const ext = strsubstring;
      // Verification de l'extension du ficihier est valide
      if (accept.indexOf(strsubstring) === -1) {
        this.snackbar.openSnackBar(
          "Ce fichier " + file.name + " n'est " + extension,
          "OK",
          ["mycssSnackbarRed"]
        );
        return;
      } else {
        // recuperation du fichier et conversion en base64
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (type === "photo_profile") {
            const img = new Image();
            img.src = e.target.result;

            img.onload = () => {
              const docBase64Path = e.target.result;

              if (
                ext === ".png" ||
                ext === ".PNG" ||
                ext === ".jpg" ||
                ext === ".JPG" ||
                ext === ".jpeg" ||
                ext === ".JPEG"
              ) {
                this.saveStoreFile(file, type);
              }
            };
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  saveStoreFile(file, type) {
    console.log("hello");
    let formData = new FormData();
    formData.append("file", file);
    this._changeDetectorRef.detectChanges();
    const dataFile = { file: file };
    this.clientServive
      .saveStoreFile("image/uploadFileDossier", formData)
      .subscribe(
        (resp) => {
          if (resp) {
            console.log(resp);
            this.noImageStore = resp["data"];
            console.log(this.noImageStore);

            this.saveFile(this.noImageStore);
            this._changeDetectorRef.detectChanges();
            //   this.snackbar.openSnackBar('Fichier chargée avec succès', 'OK', ['mycssSnackbarGreen']);
          }
        },
        (error) => {
          this.snackbar.showErrors(error);
        }
      );
  }

  saveFile(file) {
    this.loaderImg = true;
    this._changeDetectorRef.detectChanges();
    this.clientServive
      .updateEntity("personneAffectes/addImage", this.infosPap.id, file)
      .subscribe(
        (resp) => {
          console.log(resp["data"][0]);
          this.imagePath = `${this.urlImage + resp["data"][0].imagePath}`;
          this.loaderImg = false;
          this._changeDetectorRef.detectChanges();
          this.snackbar.openSnackBar("Fichier chargée avec succès", "OK", [
            "mycssSnackbarGreen",
          ]);
          this.getpap();
        },
        (error) => {
          this.loaderImg = false;
          this.snackbar.showErrors(error);
        }
      );
  }

  signatureClient(): void {
    this.dialogRef = this._matDialog.open(SignatureClientComponent, {
      autoFocus: true,
      width: "35rem",
      panelClass: "event-form-dialog",
      disableClose: true,
      data: {
        action: "new",
        pap: this.infosPap,
      },
    });
    this.dialogRef.afterClosed().subscribe((resp) => {
      // this.getClient(this.paramsId);
    });
  }

  getpap() {
    let data = this.localService.getDataJson("pap");
    this.infosPap = this.localService.getDataJson("pap");

    if (this.infosPap.imagePath != null) {
      this.imagePath = `${this.urlImage + this.infosPap.imagePath}`;
    }
  }


  getPlainteByCodePap() {
    return this.papservice
      .getByCodePap("plaintes", this.infosPap.codePap)
      .subscribe((data: any) => {
        this.loadData = false;
        if (data["responseCode"] == 200) {
          this.loadData = false;
          console.log(data["data"]);
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
      });
  }

  getEntenteByCodePap() {
    return this.papservice
      .getByCodePap("entente_compensations", this.infosPap.codePap)
      .subscribe((data: any) => {
        this.loadData = false;
        if (data["responseCode"] == 200) {
          this.loadData = false;
          console.log(data["data"]);
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
      });
  }

  createHeaderPlainte() {
    return [
      {
        th: "Numéro du dossier",
        td: "numeroDossier",
      },
      {
        th: "Code Pap",
        td: "codePap",
      },
      {
        th: "Date d'enregistrement",
        td: "dateEnregistrement",
      },
      {
        th: "Objet",
        td: "recommandation",
      },
    ];
  }

  createHeaderEntente() {
    return [
      {
        th: "Code Pap",
        td: "codePap",
      },
      {
        th: "Prenom",
        td: "prenom",
      },
      {
        th: "Nom",
        td: "nom",
      },
      {
        th: "Date d'enregistrement",
        td: "dateEnregistrement",
      },
    ];
  }

  createActionsPlainte(): ButtonAction[] {
    return [
      {
        icon: "bxs-info-circle",
        couleur: "#00bfff	",
        size: "icon-size-4",
        title: "détail",
        isDisabled: this.hasDelete,
        action: (element?) => this.detailItemsPlainte(element.id, element),
      },
    ];
  }

  detailItemsPlainte(id, information) {
    console.log("ttetete",information);
    this.localService.saveDataJson("plainte", information);
    this._router.navigate(["plainte/detail"]);
  }






  createActionsEntente(): ButtonAction[] {
    return [
      {
        icon: "bxs-info-circle",
        couleur: "#00bfff	",
        size: "icon-size-4",
        title: "détail",
        isDisabled: this.hasDelete,
        action: (element?) => this.detailItemsEntente(element.id, element),
      },
    ];
  }

  detailItemsEntente(id, information) {
    console.log("ttetete",information);
    this.localService.saveDataJson("entente", information);
    this._router.navigate(['ententeCompensation/detail']);
  }


  pageChanged(event) {
    console.log(event);
    this.datas = [];
    this._changeDetectorRef.markForCheck();
    console.log(event.pageIndex);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.offset = this.pageIndex;
    this.getPlainteByCodePap();
  }
}
