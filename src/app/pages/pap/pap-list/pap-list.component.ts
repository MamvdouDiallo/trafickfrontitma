import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import {
  ButtonAction,
  TableauComponent,
} from "src/app/shared/tableau/tableau.component";
import { UIModule } from "../../../shared/ui/ui.module";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { AngularMaterialModule } from "src/app/shared/angular-materiel-module/angular-materiel-module";
import { TesterComponent } from "../../tester/tester.component";
import { SnackBarService } from "src/app/shared/core/snackBar.service";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { PapAddComponent } from "../pap-add/pap-add.component";

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
  ],
  imports: [TableauComponent, UIModule, AngularMaterialModule],
})
export class PapListComponent implements OnInit {
  [x: string]: any;
  data = [
    {
      id_pap: "OY2_13417",
      nom_prenom: "Diallo Mamadou",
      nationalite: "Sénégalaise",
      identification_pap: "1999191103140",
      sexe: "masculin",
      numero_telephone: "7767617677",
    },
    {
      id_pap: "AL1_23456",
      nom_prenom: "Camara Aïssatou",
      nationalite: "Guinéenne",
      identification_pap: "1987123101234",
      sexe: "féminin",
      numero_telephone: "6223456789",
    },
    {
      id_pap: "CA3_87654",
      nom_prenom: "Nguyen Minh",
      nationalite: "Vietnamienne",
      identification_pap: "2003051505678",
      sexe: "masculin",
      numero_telephone: "84987654321",
    },
    {
      id_pap: "US4_98765",
      nom_prenom: "Smith Jennifer",
      nationalite: "Américaine",
      identification_pap: "1985042312345",
      sexe: "féminin",
      numero_telephone: "15551234567",
    },
    {
      id_pap: "FR5_54321",
      nom_prenom: "Dubois Pierre",
      nationalite: "Française",
      identification_pap: "1978030412345",
      sexe: "masculin",
      numero_telephone: "33123456789",
    },
    {
      id_pap: "JP6_67890",
      nom_prenom: "Sato Takeshi",
      nationalite: "Japonaise",
      identification_pap: "1990121509876",
      sexe: "masculin",
      numero_telephone: "81345678901",
    },
    {
      id_pap: "IT7_98765",
      nom_prenom: "Rossi Giuseppe",
      nationalite: "Italienne",
      identification_pap: "1987022812345",
      sexe: "masculin",
      numero_telephone: "390123456789",
    },
    {
      id_pap: "DE8_45678",
      nom_prenom: "Müller Anna",
      nationalite: "Allemande",
      identification_pap: "1995113009876",
      sexe: "féminin",
      numero_telephone: "4912345678901",
    },
    {
      id_pap: "BR9_12345",
      nom_prenom: "Silva Pedro",
      nationalite: "Brésilienne",
      identification_pap: "1980041501234",
      sexe: "masculin",
      numero_telephone: "5511987654321",
    },
    {
      id_pap: "RU10_34567",
      nom_prenom: "Ivanov Maria",
      nationalite: "Russe",
      identification_pap: "1989010109876",
      sexe: "féminin",
      numero_telephone: "74951234567",
    },
    {
      id_pap: "CN11_56789",
      nom_prenom: "Wang Li",
      nationalite: "Chinoise",
      identification_pap: "1995111104567",
      sexe: "féminin",
      numero_telephone: "8613812345678",
    },
    {
      id_pap: "ZA12_87654",
      nom_prenom: "Mabena Sipho",
      nationalite: "Sud-Africaine",
      identification_pap: "1982102509876",
      sexe: "masculin",
      numero_telephone: "27831234567",
    },
    {
      id_pap: "AU13_23456",
      nom_prenom: "Nguyen Minh",
      nationalite: "Australienne",
      identification_pap: "1987123101234",
      sexe: "masculin",
      numero_telephone: "61412345678",
    },
    {
      id_pap: "ES14_34567",
      nom_prenom: "García Marta",
      nationalite: "Espagnole",
      identification_pap: "1990031509876",
      sexe: "féminin",
      numero_telephone: "34612345678",
    },
    {
      id_pap: "PT15_98765",
      nom_prenom: "Sousa João",
      nationalite: "Portugaise",
      identification_pap: "1985123101234",
      sexe: "masculin",
      numero_telephone: "351912345678",
    },
    {
      id_pap: "AR16_87654",
      nom_prenom: "Martinez María",
      nationalite: "Argentine",
      identification_pap: "1980102509876",
      sexe: "féminin",
      numero_telephone: "541123456789",
    },
    {
      id_pap: "KR17_34567",
      nom_prenom: "Kim Minho",
      nationalite: "Coréenne",
      identification_pap: "1995111104567",
      sexe: "masculin",
      numero_telephone: "821012345678",
    },
    {
      id_pap: "IN18_87654",
      nom_prenom: "Patel Neha",
      nationalite: "Indienne",
      identification_pap: "1982102509876",
      sexe: "féminin",
      numero_telephone: "919876543210",
    },
    {
      id_pap: "CA19_23456",
      nom_prenom: "Trudeau Justin",
      nationalite: "Canadienne",
      identification_pap: "1971123101234",
      sexe: "masculin",
      numero_telephone: "14165551234",
    },
    {
      id_pap: "GB20_34567",
      nom_prenom: "Smith Emily",
      nationalite: "Britannique",
      identification_pap: "1985042312345",
      sexe: "féminin",
      numero_telephone: "447700900123",
    },
    {
      id_pap: "NG21_87654",
      nom_prenom: "Okafor Chinedu",
      nationalite: "Nigériane",
      identification_pap: "1987022812345",
      sexe: "masculin",
      numero_telephone: "2348123456789",
    },
    {
      id_pap: "SA22_23456",
      nom_prenom: "Al-Mansour Fatima",
      nationalite: "Saoudienne",
      identification_pap: "1999113009876",
      sexe: "féminin",
      numero_telephone: "966512345678",
    },
    {
      id_pap: "JP23_34567",
      nom_prenom: "Yamamoto Takashi",
      nationalite: "Japonaise",
      identification_pap: "2001010104567",
      sexe: "masculin",
      numero_telephone: "81361234567",
    },
    {
      id_pap: "IT24_87654",
      nom_prenom: "Russo Giorgio",
      nationalite: "Italienne",
      identification_pap: "1985123109876",
      sexe: "masculin",
      numero_telephone: "390212345678",
    },
    {
      id_pap: "DE25_98765",
      nom_prenom: "Schmidt Anna",
      nationalite: "Allemande",
      identification_pap: "1993113001234",
      sexe: "féminin",
      numero_telephone: "4915123456789",
    },
  ];

  filterTable($event: any) {
    throw new Error("Method not implemented.");
  }
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
  pageIndex: number = 0;
  pageSize: number = 10;
  //constantes = CONSTANTES;
  userConnecter;
  offset: number = 0;
  title: string = "Gestion des produits";
  url: string = "produit-entite";
  panelOpenState = false;
  img;
  image;
  privilegeByRole: any; //liste des codes recu de l'api lors de la connexion
  privilegeForPage: number = 2520; //code privilege envoye pour afficher la page
  privilegePage;
  headers: any = [];
  btnActions: any = [];

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private _router: Router,
    private datePipe: DatePipe,
    private snackbar: SnackBarService,
    private _matDialog: MatDialog,
    public matDialogRef: MatDialogRef<TesterComponent>
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: "Pap" },
      { label: "Pap List", active: true },
    ];
    this.getList();
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
        td: "id_pap",
      },
      {
        th: "NOM & PRENOM",
        td: "nom_prenom",
      },
      {
        th: "NATIONALITE",
        td: "nationalite",
      },
      {
        th: "IDENTIFICATION_PAP",
        td: "identification_pap",
      },
    ];
  }

  // createActions(): ButtonAction[] {
  //   return [
  //     {
  //       icon: "",
  //       couleur: "text-green-400",
  //       size: "icon-size-4",
  //       title: "Modifier",
  //       isDisabled: !this.hasUpdate,
  //       action: (element?) => this.updateItems(element),
  //     },
  //     {
  //       icon: "",
  //       couleur: "text-red-400",
  //       size: "icon-size-4",
  //       title: "Supprimer",
  //       isDisabled: !this.hasDelete,
  //       action: (element?) => this.supprimerItems(element.id, element),
  //     },
  //   ];
  // }

  createActions(): ButtonAction[] {
    return [
      {
        icon: "edit",
        couleur: "text-green-400",
        size: "icon-size-4",
        title: "Modifier",
        isDisabled: !this.hasUpdate,
        action: (element?) => this.updateItems(element),
      },
      {
        icon: "delete",
        couleur: "text-red-400",
        size: "icon-size-4",
        title: "Supprimer",
        isDisabled: !this.hasDelete,
        action: (element?) => this.supprimerItems(element.id, element),
      },
    ];
  }

  //cette fonction permet d'afficher la liste
  getList() {
    this.loadData = true;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.datas = this.data;
    this.length = this.data.length;
    this.changeDetectorRefs.markForCheck();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  pageChanged(event) {
    console.log(event);
    this.datas = [];
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.offset = this.pageIndex * this.pageSize;
    this.getList();
  }

  updateItems(information): void {
    // this.snackbar.openModal(AjoutProduitEntiteComponent, '50rem', 'edit', '', information, '', () => {
    //     this.getList();
    // });
  }

  //cette fonction permet de supprimer
  supprimerItems(id, information) {
    // this.snackbar.showConfirmation('Voulez-vous vraiment supprimer ce produit entité frais ?').then((result) => {
    //     if (result['value'] == true) {
    //         this.deleteUser = true;
    //         this.currentIndex = information;
    //         this.showLoader = 'isShow';
    //         const message = 'Produit entité frais supprimé';
    //         this.coreService.deleteItem(id, this.url).subscribe((resp) => {
    //             this.showLoader = 'isNotShow';
    //             this.coreService.list(this.url, this.offset, this.pageSize).subscribe((resp: any) => {
    //                 const data = resp['data'] || resp;
    //                 this.dataSource = new MatTableDataSource(data);
    //                 this.dataSource.paginator = this.paginator;
    //                 this.dataSource.sort = this.sort;
    //                 this.deleteUser = false;
    //                 this.datas = resp['data'] || data;
    //                 this.length = resp['total'] || data.length;
    //                 this.changeDetectorRefs.markForCheck();
    //                 this.changeDetectorRefs.detectChanges();
    //                 this.snackbar.openSnackBar(message + ' avec succès', 'OK', ['mycssSnackbarGreen']);
    //             });
    //         }, (error) => {
    //             this.showLoader = 'isNotShow';
    //             this.deleteUser = false;
    //             this.snackbar.showErrors(error);
    //         });
    //     }
    // });
  }

  filterList() {
    this.isCollapsed = !this.isCollapsed;
  }

  //cette fonction permet d'exporter la liste sous format excel ou pdf
  exportAs(format) {
    const nom = "Liste des produits";
    let value = [];
    // this.coreService.list(this.url, 0, 1000000000).subscribe((resp) => {
    //     if (resp['responseCode'] == this.constantes.HTTP_STATUS.SUCCESSFUL) {
    //         value = resp['data'];
    //         if (value.length != 0) {
    //             const user = this.coreService.decriptDataToLocalStorage('CD-@--5');
    //             if (format == 'pdf') {
    //                 const donne = this.exempleGenPdfHeaderFooter(user.firstName + ' ' + user.lastName, nom);
    //                 const doc = donne.doc;
    //                 let col = this.informations.tabFileHead;
    //                 let rows = [];
    //                 let itemCurrent;
    //                 for (let item of value) {
    //                     itemCurrent = item;
    //                     const tabField = [];
    //                     const elementKeys = Object.keys(item);
    //                     let i = 0;
    //                     for (const field of this.informations.tabFileBody) {
    //                         for (const element of elementKeys) {
    //                             if (field == element) {
    //                                 if (field == 'createdAt' || field == 'dateNaiss' || field == 'dateCirculation' || field == 'dateDepart' || field == 'dateDarriver' || field == 'date' || field == 'dateDebut' || field == 'dateFin' || field == 'dateCreated') {
    //                                     tabField.push(moment(itemCurrent[field]).format('DD/MM/YYYY') || '');
    //                                 } else {
    //                                     if (typeof itemCurrent[field] == 'object') {
    //                                         tabField.push(!(itemCurrent[field] instanceof Object) ? itemCurrent[field] : itemCurrent[field]['libelle'] ? itemCurrent[field]['libelle'] : itemCurrent[field]['code'] ? itemCurrent[field]['code'] : itemCurrent[field]['intituleClient'] ? itemCurrent[field]['intituleClient'] : itemCurrent[field]['nom']);
    //                                     } else {
    //                                         tabField.push(itemCurrent[field] || '');
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                         i++;
    //                     }
    //                     rows.push(tabField);
    //                 }
    //                 autoTable(doc, {head: [col], body: rows});
    //                 doc.save(nom + '.pdf');
    //                 this.snackbar.openSnackBar('Téléchargement réussi', 'OK', ['mycssSnackbarGreen']);
    //                 this.exporter = false;
    //             } else if (format == 'excel') {
    //                 let rows = [];
    //                 let itemCurrent;
    //                 for (let item of value) {
    //                     itemCurrent = item;
    //                     const tabField = [];
    //                     const elementKeys = Object.keys(item);
    //                     let i = 0;
    //                     for (const field of this.informations.tabFileBody) {
    //                         for (const element of elementKeys) {
    //                             if (element.toString() == field.toString()) {
    //                                 if (field == 'createdAt' || field == 'dateNaiss' || field == 'dateCirculation' || field == 'dateDepart' || field == 'dateDarriver' || field == 'date' || field == 'dateDebut' || field == 'dateFin' || field == 'dateCreated') {
    //                                     tabField.push({[this.informations.tabFileHead[i]]: (moment(itemCurrent[field]).format('DD/MM/YYYY') || '')});
    //                                 } else {
    //                                     if (typeof itemCurrent[field] == 'object') {
    //                                         tabField.push({[this.informations.tabFileHead[i]]: (!(itemCurrent[field] instanceof Object) ? itemCurrent[field] : itemCurrent[field]['libelle'] ? itemCurrent[field]['libelle'] : itemCurrent[field]['code'] ? itemCurrent[field]['code'] : itemCurrent[field]['intituleClient'] ? itemCurrent[field]['intituleClient'] : itemCurrent[field]['nom'])});
    //                                     } else {
    //                                         tabField.push({[this.informations.tabFileHead[i]]: (itemCurrent[field] || '')});
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                         i++;
    //                     }
    //                     rows.push(Object.assign({}, ...tabField));
    //                 }
    //                 this.exportService.exportAsExcelFile(this.exportService.preFormatLoanInfo(rows), nom);
    //                 this.snackbar.openSnackBar('Téléchargement réussi', 'OK', ['mycssSnackbarGreen']);
    //                 this.exporter = false;
    //             }
    //         } else {
    //             this.snackbar.openSnackBar('La liste est vide!!!', 'OK', ['mycssSnackbarRed']);
    //         }
    //     } else {
    //         this.loadData = false;
    //     }
    // }, (error) => {
    //     this.snackbar.showErrors(error);
    // });
  }

  exempleGenPdfHeaderFooter(userName, fileName) {
    //     const toDay = new Date();
    //     let marginX = 0;
    //     const doc = new jsPDF();
    //     const totalPagesExp = '{total_pages_count_string}';
    //     doc.setFillColor(0, 0, 255);
    //     const columns = ['                     ', fileName, 'Créé par ' + userName + ' le :' + this.datePipe.transform(toDay, 'dd/MM/yyyy')];
    //     const rows = [];
    //     autoTable(doc, {
    //         head: [columns],
    //         body: rows,
    //         theme: 'grid',
    //         margin: {
    //             top: 10
    //         },
    //         didDrawCell: function (data) {
    //             if (
    //                 (data.row.section === 'head') &&
    //                 data.column.index === 1
    //             ) {
    //                 data.cell.styles.textColor = [51, 122, 183];
    //                 data.cell.styles.fontSize = 12;
    //                 data.cell.styles.valign = 'middle';
    //                 data.cell.styles.fillColor = [216, 78, 75];
    //             }
    //             if (
    //                 (data.row.section === 'head') &&
    //                 data.column.index === 0
    //             ) {
    //                 doc.addImage(logo, 'JPEG', data.cell.x + 2, data.cell.y + 2, 30, 15);
    //             }
    //         },
    //         didDrawPage: function (data) {
    //             marginX = data.settings.margin.left;
    //             // Header
    //             doc.setFontSize(12);
    //             doc.setTextColor(255);
    //         },
    //         styles: {
    //             lineColor: [0, 0, 0],
    //             lineWidth: 0.3,
    //             textColor: [51, 122, 183],
    //         },
    //         headStyles: {
    //             fillColor: [255, 255, 255],
    //             fontSize: 10,
    //             fontStyle: 'normal',
    //             valign: 'middle',
    //             textColor: 0,
    //             minCellHeight: 20,
    //         },
    //         willDrawCell: function (data) {
    //             if (data.row.section === 'head') {
    //                 doc.setTextColor(51, 122, 183);
    //             }
    //             if (data.row.section === 'head' && data.column.index === 1) {
    //                 doc.setFontSize(12);
    //             }
    //         },
    //     });
    //     return {doc: doc, marginX: marginX, totalPagesExp: totalPagesExp};
    // }
    // rechercherGlobal(event?) {
    //     this.rechercher = event;
    //     if (this.rechercher !== '') {
    //         const data = {
    //             'isGlobal': true,
    //             'typeEntity': this.url,
    //             'searchQuery': this.rechercher
    //         };
    //         this.isSearch = true;
    //         this.coreService.doRechercher(data, this.url).subscribe(response => {
    //             this.isSearch = false;
    //             this.datas = response['list'];
    //             this.dataSource = new MatTableDataSource(this.datas);
    //             this.changeDetectorRefs.markForCheck();
    //             this.length = response['total'];
    //             this.isSearch = false;
    //         });
    //     } else {
    //         this.getList();
    //     }
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
}
