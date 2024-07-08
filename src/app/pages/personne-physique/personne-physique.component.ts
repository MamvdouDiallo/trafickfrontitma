import {CommonModule, DatePipe} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
//import {ExportService} from 'app/core/auth/export.service';
//import {SnackBarService} from 'app/core/auth/snackBar.service';
//import {CoreService} from 'app/core/core/core.service';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as moment from 'moment';
//import {CONSTANTES} from '../model/constantes';
import {AjoutPersonnePhysiqueComponent} from './ajout/ajout.component';
import {DetailPersonnePhysiqueComponent} from './detail-personne-physique/detail-personne-physique.component';
//import {ButtonAction} from 'app/shared/tableau/tableau.component';
import { CoreService } from 'src/app/shared/core/core.service';
import { SnackBarService } from 'src/app/shared/core/snackBar.service';
import { ExportService } from 'src/app/shared/core/export.service';
import { ButtonAction, TableauComponent } from 'src/app/shared/tableau/tableau.component';
import { CONSTANTES } from 'src/app/shared/models/constantes';
import { logo } from 'src/app/shared/logo';
import { EnteteComponent } from 'src/app/shared/entete/entete.component';
import { AngularMaterialModule } from 'src/app/shared/angular-materiel-module/angular-materiel-module';

@Component({
    selector: 'app-personne-physique',
    templateUrl: './personne-physique.component.html',
    styleUrls: ['./personne-physique.component.scss'],
    standalone:true,
    imports:[TableauComponent,EnteteComponent,AngularMaterialModule,CommonModule,ReactiveFormsModule],
    providers: [
      ExportService,
      DatePipe,
      {
          provide: MatDialogRef,
          useValue: [],
      },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class PersonnePhysiqueComponent implements OnInit {
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
    datas: any = [];
    dataLocal: any = [];
    deleteUser: boolean = false;
    currentIndex;
    loadData: boolean = false;
    exporter: boolean = false;
    isCollapsed: boolean = false;
    isSearch2: boolean = false;
    isSearch: boolean = false;
    rechercher = '';
    showLoader = 'isNotShow';
    message = '';
    config: any;
    pageSizeOptions = [5, 10, 25, 100, 500, 1000];
    pageIndex: number = 0;
    pageSize: number = 10;
    constantes = CONSTANTES;
    userConnecter;
    offset: number = 0;
    title: string = 'Gestion des personnes physiques';
    url: string = 'personne-physique';
    img;
    image;

    privilegeByRole: any; //liste des codes recu de l'api lors de la connexion
    privilegeForPage: number = 3140; //code privilege envoye pour afficher la page
    natureList = [];
    privilegePage;

    headers: any = [];
    btnActions: any = [];


    constructor(
        private _matDialog: MatDialog,
        private coreService: CoreService,
        private changeDetectorRefs: ChangeDetectorRef,
        private snackbar: SnackBarService,
        private exportService: ExportService,
        private datePipe: DatePipe,
        private _router: Router,
        private fb: UntypedFormBuilder
    ) {
       // this.privilegeByRole = this.coreService.decriptDataToLocalStorage('CD-1');
        //this.privilegePage = this.privilegeByRole.find(el => el == this.privilegeForPage);
        // if (!this.privilegePage) {
        //     this.snackbar.openSnackBar('Vous n\'avez pas accés a cette fonctionnalité, Veuillez contacter votre administrateur', 'OK', ['mycssSnackbarRed']);
        //     this._router.navigate(['/project']);
        // }


        this.informations = {
            url: 'personne-physique',
            exportFile: ['excel', 'pdf'],
            code: '01410',
            tabHead: ['Prénom', 'Nom', 'Téléphone', 'Email', 'Date de création'],
            tabFileHead: ['Prénom', 'Nom', 'Téléphone', 'Email', 'Numéro piéce', 'Date de création'],
            searchFields: [],
            tabBody: ['prenom', 'nom', 'phoneNumber', 'email', 'createdAt'],
            tabFileBody: ['prenom', 'nom', 'phoneNumber', 'email', 'numeroPiece', 'createdAt'],
            action: [{name: 'modifier', icon: 'edit', color: 'primary'}, {
                name: 'supprimer',
                icon: 'delete',
                color: 'red'
            }, {name: 'detail', icon: 'detail', color: 'red'}],
        };
        //
        this.displayedColumns = this.informations.tabBody;
       // this.userConnecter = this.coreService.decriptDataToLocalStorage('CD-@--5');
    }

    initform(): void {
        this.searchForm = this.fb.group({
            prenom: [''],
            nom: [''],
            phoneNumber: [''],
            email: [''],
            numeroPiece: [''],
            naturePiece: ['']
        });
    }

    ngOnInit(): void {
        //this.img = this.coreService.decriptDataToLocalStorage('CD-@--11');
        this.image = 'url(' + this.img + ')';
        this.displayedColumns.push('action');
        this.initform();
        // if (this.privilegePage) {
        //     this.getList();
        //     this.checkCodePrivilegeForRole();
        //     this.getNaturePiece();
        //     this.headers = this.createHeader();
        //     this.btnActions = this.createActions();
        // }
    }


    checkCodePrivilegeForRole() {
        this.hasList = this.privilegeByRole.indexOf('0' + (this.privilegeForPage + 1)) != -1;
        this.hasAdd = this.privilegeByRole.indexOf('0' + (this.privilegeForPage + 2)) != -1;
        this.hasUpdate = this.privilegeByRole.indexOf('0' + (this.privilegeForPage + 3)) != -1;
        this.hasDelete = this.privilegeByRole.indexOf('0' + (this.privilegeForPage + 4)) != -1;
        this.hasDetail = this.privilegeByRole.indexOf('0' + (this.privilegeForPage + 5)) != -1;

    }

    createHeader() {
        return [
            {
                th: 'Prénom',
                td: 'prenom',
                type:'titeCase'
            },
            {
                th: 'Nom',
                td: 'nom',
                type:'titeCase'
            },
            {
                th: 'Téléphone',
                td: 'phoneNumber'
            },
            {
                th: 'Email',
                td: 'email'
            },
            {
                th: 'Date de création',
                td: 'createdAt', type: 'd'
            }
        ];
    }

    createActions(): ButtonAction[] {
        return [
            {
                icon: "edit",
                couleur: "text-green-400",
                size: "icon-size-4",
                title: "Modifier",
                isDisabled: !this.hasUpdate,
                action: (element?) => this.updateItems(element)
            },
            {
                icon: "delete_outline",
                couleur: "text-red-400",
                size: "icon-size-4",
                title: "Supprimer",
                isDisabled: !this.hasDelete,
                action: (element?) => this.supprimerItems(element.id, element)
            },
            {
                icon: "heroicons_outline:clipboard-list",
                couleur: "c-colorDetail",
                size: "icon-size-4",
                title: "détail de la personne",
                isDisabled: !this.hasDetail,
                action: (element?) => this.details(element)
            },
        ]
    }

    //cette fonction permet d'afficher la liste
    getList() {
        this.loadData = true;
        this.coreService.list('personne-physique', this.offset, this.pageSize)
            .subscribe((response) => {
                this.loadData = false;
                if (response['responseCode'] === 200 || response) {
                    this.loadData = false;
                    const data = response['data'] || response;
                    // this.dataSource = new MatTableDataSource(data);
                    // this.dataSource.paginator = this.paginator;
                    this.datas = response['data'];
                    this.length = response['total'];
                    this.changeDetectorRefs.markForCheck();
                } else {
                    this.loadData = false;
                    this.dataSource = new MatTableDataSource();
                }
            }, (error) => {
                this.loadData = false;
            });
    }

    pageChanged(event) {
        this.datas = [];
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.offset = this.pageIndex * this.pageSize;
        this.getList();
    }

    addItems(): void {
        this.snackbar.openModal( AjoutPersonnePhysiqueComponent, '55rem', 'new', '', this.datas, '', () => {
            this.getList();
        });
    }

    updateItems(information) {
        this.snackbar.openModal( AjoutPersonnePhysiqueComponent, '55rem', 'edit', '', information, information.id, () => {
            this.getList();
        });
    }

    //cette fonction permet de supprimer
    supprimerItems(id, information) {
        this.snackbar.showConfirmation('Voulez-vous vraiment supprimer cette personne physique ?').then((result) => {
            if (result['value'] == true) {
                this.deleteUser = true;
                this.currentIndex = information;
                this.showLoader = 'isShow';
                let message = '';
                message = 'Personne physique supprimée ';
                this.coreService.deleteItem(id, this.url).subscribe((resp) => {
                    this.showLoader = 'isNotShow';
                    this.coreService.list(this.url, this.offset, this.pageSize).subscribe((resp: any) => {
                        this.dataSource = new MatTableDataSource(resp['data']);
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                        this.deleteUser = false;
                        this.datas = resp['data'];
                        this.length = resp['total'];
                        this.changeDetectorRefs.markForCheck();
                        this.changeDetectorRefs.detectChanges();
                        this.snackbar.openSnackBar(message + ' avec succès', 'OK', ['mycssSnackbarGreen']);
                    });

                }, (error) => {
                    this.showLoader = 'isNotShow';
                    this.deleteUser = false;
                    this.snackbar.showErrors(error);
                });
            }
        });
    }

    filterList() {
        this.isCollapsed = !this.isCollapsed;
    }

    //cette fonction permet d'exporter la liste sous format excel ou pdf
    exportAs(format) {
        const nom = 'Liste des personnes physiques';
        let value = [];
        this.coreService.list(this.url, 0, 1000000000).subscribe((resp) => {
            if (resp['responseCode'] == 200) {
                value = resp['data'];
                if (value.length != 0) {
                    const user = this.coreService.decriptDataToLocalStorage('CD-@--5');
                    if (format == 'pdf') {
                        const donne = this.exempleGenPdfHeaderFooter(user.firstName + ' ' + user.lastName, nom);
                        const doc = donne.doc;
                        let col = this.informations.tabFileHead;
                        let rows = [];
                        let itemCurrent;
                        for (let item of value) {
                            itemCurrent = item;
                            const tabField = [];
                            const elementKeys = Object.keys(item);
                            let i = 0;
                            for (const field of this.informations.tabFileBody) {
                                for (const element of elementKeys) {
                                    if (field == element) {
                                        if (field == 'createdAt' || field == 'dateNaiss' || field == 'dateCirculation' || field == 'dateDepart' || field == 'dateDarriver' || field == 'date' || field == 'dateDebut' || field == 'dateFin') {
                                            tabField.push(moment(itemCurrent[field]).format('DD/MM/YYYY') || '');
                                        } else {
                                            tabField.push(itemCurrent[field] || '');
                                        }
                                    }
                                }
                                i++;
                            }
                            rows.push(tabField);
                        }
                        autoTable(doc, {head: [col], body: rows});
                        doc.save(nom + '.pdf');
                        this.snackbar.openSnackBar('Téléchargement réussi', 'OK', ['mycssSnackbarGreen']);
                        this.exporter = false;
                    } else if (format == 'excel') {
                        let rows = [];
                        let itemCurrent;
                        for (let item of value) {
                            itemCurrent = item;
                            const tabField = [];
                            const elementKeys = Object.keys(item);
                            let i = 0;
                            for (const field of this.informations.tabFileBody) {
                                for (const element of elementKeys) {
                                    if (element.toString() == field.toString()) {
                                        if (field == 'createdAt' || field == 'dateNaiss' || field == 'dateCirculation' || field == 'dateDepart' || field == 'dateDarriver' || field == 'date' || field == 'dateDebut' || field == 'dateFin') {
                                            tabField.push({[this.informations.tabFileHead[i]]: (moment(itemCurrent[field]).format('DD/MM/YYYY') || '')});
                                        } else {
                                            tabField.push({[this.informations.tabFileHead[i]]: (itemCurrent[field] || '')});
                                        }
                                    }
                                }
                                i++;
                            }
                            rows.push(Object.assign({}, ...tabField));
                        }
                        this.exportService.exportAsExcelFile(this.exportService.preFormatLoanInfo(rows), nom);
                        this.snackbar.openSnackBar('Téléchargement réussi', 'OK', ['mycssSnackbarGreen']);
                        this.exporter = false;
                    }
                } else {
                    this.snackbar.openSnackBar('La liste est vide!!!', 'OK', ['mycssSnackbarRed']);
                }
            } else {
                this.loadData = false;
            }
        }, (error) => {
            this.snackbar.showErrors(error);
        });

    }

    exempleGenPdfHeaderFooter(userName, fileName) {
        const toDay = new Date();
        let marginX = 0;
        const doc = new jsPDF();
        const totalPagesExp = '{total_pages_count_string}';
        doc.setFillColor(0, 0, 255);
        const columns = ['                     ', fileName, 'Créé par ' + userName + ' le :' + this.datePipe.transform(toDay, 'dd/MM/yyyy')];
        const rows = [];
        autoTable(doc, {
            head: [columns],
            body: rows,
            theme: 'grid',
            margin: {
                top: 10
            },
            didDrawCell: function (data) {
                if (
                    (data.row.section === 'head') &&
                    data.column.index === 1
                ) {
                    data.cell.styles.textColor = [51, 122, 183];
                    data.cell.styles.fontSize = 12;
                    data.cell.styles.valign = 'middle';
                    data.cell.styles.fillColor = [216, 78, 75];
                }
                if (
                    (data.row.section === 'head') &&
                    data.column.index === 0
                ) {
                    doc.addImage(logo, 'JPEG', data.cell.x + 2, data.cell.y + 2, 25, 17);
                }
            },
            didDrawPage: function (data) {
                marginX = data.settings.margin.left;
                // Header
                doc.setFontSize(12);
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
                fontStyle: 'normal',
                valign: 'middle',
                textColor: 0,
                minCellHeight: 20,
            },
            willDrawCell: function (data) {
                if (data.row.section === 'head') {
                    doc.setTextColor(71, 152, 143);
                }
                if (data.row.section === 'head' && data.column.index === 1) {
                    doc.setFontSize(11);
                }
            },
        });
        return {doc: doc, marginX: marginX, totalPagesExp: totalPagesExp};
    }

    searchFilter() {
        this.message = '';
        const value = this.searchForm.value;
        value['max'] = this.pageSize;
        value['offset'] = this.pageIndex;

        const data = {
            'isGlobal': false,
            'typeEntity': 'personne-physique',
            'searchQuery': value
        };
        this.isSearch2 = true;
        this.coreService.doRechercher(data, 'personne-physique').subscribe((response: any) => {
                if (response['responseCode'] == 200) {
                    this.isSearch2 = false;
                    this.loadData = false;
                    const data = response['data'];
                    let value: any = [];
                    value = data.slice(this.offset, this.pageSize);
                    this.dataSource = new MatTableDataSource(value);
                    this.datas = response['data'];
                    this.changeDetectorRefs.detectChanges();

                    this.length = data.length;
                    if (value.length == 0) {
                        this.datas = [{}];
                        this.message = 'Aucun resultat trouvé';
                        this.changeDetectorRefs.detectChanges();
                    } else {
                        this.datas = value;
                        this.changeDetectorRefs.detectChanges();
                    }
                } else {
                    this.datas = response['list'];
                    this.isSearch2 = false;
                    this.changeDetectorRefs.detectChanges();
                }
            },
            (error) => {
                this.isSearch2 = false;
                this.snackbar.showErrors(error);
                this.changeDetectorRefs.detectChanges();
            }
        );
    }


    rechercherGlobal(event?) {
        this.rechercher = event;
        if (this.rechercher !== '') {
            const data = {
                'isGlobal': true,
                'typeEntity': this.informations.url,
                'searchQuery': this.rechercher
            };
            this.isSearch = true;
            this.coreService.doRechercher(data, this.informations.url).subscribe(response => {
                this.isSearch = false;
                this.datas = response['list'];
                this.dataSource = new MatTableDataSource(this.datas);
                this.changeDetectorRefs.markForCheck();
                this.length = response['total'];
                this.isSearch = false;
            });
        } else {
            this.getList();
        }
    }

    annulerRechercheCritere() {
        this.isCollapsed = !this.isCollapsed;
        this.initform();
        this.getList();
        this.message = '';
    }


    record(item) {
    }


    details(el) {
        this.dialogRef = this._matDialog.open(DetailPersonnePhysiqueComponent, {
            panelClass: 'event-form-dialog',
            disableClose: true,
            width: '55rem',
            height: 'auto',
            data: {
                item: el
            }
        });
    }

    getNaturePiece() {
        this.coreService.list('nature-piece', 0, 100).subscribe((resp) => {
            if (resp['responseCode'] == this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.natureList = resp[this.constantes.RESPONSE_DATA];
                this.changeDetectorRefs.markForCheck();
            } else {

            }
        });
    }


    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
