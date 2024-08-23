import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef, EventEmitter,
    OnInit, Output, TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'app/core/core/core.service';
import moment from 'moment';
import swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
import { CONSTANTES } from '../../admin/model/constantes';
import { ClientVueService } from '../client-vue.service';
import { AjoutAttributComplementaireComponent } from '../info-client/ajout-attribut-complementaire/ajout-attribut-complementaire.component';
import { AjoutCreditComponent } from './ajout-credit/ajout-credit.component';
import { DetailRemboursementComponent } from './details-remboursement/detail-remboursement.component';
import { FinancerCreditComponent } from './financer-credit/financer-credit.component';
import { SnackBarService } from 'app/core/auth/snackBar.service';
import {HttpErrorResponse} from "@angular/common/http";
import {ExportService} from "app/core/auth/export.service";
import autoTable from "jspdf-autotable";
import {logo} from "app/shared/logo";
import {DatePipe} from "@angular/common";
import {jsPDF} from 'jspdf';
import {ReportTypeCreditComponent} from "../../admin/report-type-credit/report-type-credit.component";
import {SuspensionCreditComponent} from "../../admin/suspension-credit/suspension-credit.component";

@Component({
    selector: 'vue-credit',
    templateUrl: './credit.component.html',
    styleUrls:['./credit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {provide: MatDialogRef,useValue: {} },
        { provide: ExportService,useValue: {} },
        {provide: DatePipe, useValue: {} }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditComponent implements OnInit {
    @Output() changePage = new EventEmitter<any>();
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator)
    set _paginator(value: MatPaginator) {
        if (value !== undefined && this.dataSource) {
            this.dataSource.paginator = value;
        }
    }

    @ViewChild('signataireTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;
    @ViewChild('productionHebdo', {static: false}) public productionHebdo: ElementRef;
    @Output() exportPDF = new EventEmitter<any>();
    data: any;
    creditDataSource: MatTableDataSource<any> = new MatTableDataSource();
    creditColumns: string[] = ['ancienNumero','numero', 'typeCredit', 'montant', 'taux', 'dateMiseEnPlace', 'nombreEcheance', 'statut', 'createdAt', 'action'];
    displayedColumnsFile : string[] = ['Nº', 'Date Echéance', 'Statut','Capital Echéance','Intérét Echéance','Mnt Echéance', 'Date Paiement','Mnt Rembouré','Capital Rest dû','Capital Payé','Intérét Payé','Retard','Pénalité','Pénalité Payé'];
    displayedColumnsCompteFile : string[] = ['numero','compteGeneral','nature','intitule','solde'];
    tabFileBody: string[] = ['numero', 'dateEcheance', 'statut','montantCapital','montantInteret', 'montantEcheance',
        'datePaiement', 'montantRembourse','capitalRestant', 'montantCapitalPaye','montantInteretPaye','nombreJourRetard','montantPenalite', 'montantPenalitePaye'];

    dialogRef: any;
    isLoading: boolean = false;
    offset: number = 0;
    informations: any;
    pageSize: number = 10;
    constantes = CONSTANTES;
    infosClient: any;
    paramsId: any;
    datas: any = [];
    length: number;
    showVue: boolean = false;
    currentCredit: any;
    tableData = [];
    initForm: UntypedFormGroup;
    initBasculerForm: UntypedFormGroup;

    currentIndex;
    depotGaranties = [];
    tableCredit = [];

    montantCapitalTotal: any;
    montantEcheanceTotal: any;
    total: any;
    interetsTotals: number;
    fraisLierCredit: any;
    currentClient: any;
    creditSelect: any;
    attributComplementaires: any = [];
    currentTab = 0;
    comptesColumns: string[] = ['numero','compteGeneral','nature','nom','soldeIndicatif'];
    comptesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    comptes = [];
    tableauAmortissements:any;
    typeCompteAffiche='inactif';
    privilegeByRole: any; //liste des codes recu de l'api lors de la connexion
    privilegeForPage: number = 9871000; //code privilege envoye pour afficher la page
    hasReport: boolean; // privilége permettant d'afficher le button activer desactiver le report
    /**
     * Constructor
     */
    constructor(
        public matDialogRef: MatDialogRef<CreditComponent>,
        private clientServive: ClientVueService,
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private coreService: CoreService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private formBuilder: UntypedFormBuilder,
        private snackartService : SnackBarService,
        private snackbar: SnackBarService

    ) {
        this.privilegeByRole = this.coreService.decriptDataToLocalStorage('CD-1');
        if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
            this.data = this.router.getCurrentNavigation().extras.state.extraData.data;
        }

        this.route.params.subscribe((params) => {
            this.paramsId = params['id'];
        });
        this.creditSelect = this.coreService.decriptDataToLocalStorage('CD-@--123');
        this.currentClient = this.coreService.decriptDataToLocalStorage('CD-@--119');

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.checkCodePrivilegeForRole();
        this.initForm = this.formBuilder.group({
            motifRejet: this.formBuilder.control(null, [Validators.required]),
        });
        this.initBasculerForm = this.formBuilder.group({
            motifBasculement: this.formBuilder.control(null, [Validators.required]),
        });
        this.getCreditParams();
    }
    checkCodePrivilegeForRole() {
        this.hasReport = this.privilegeByRole.indexOf('0' + (this.privilegeForPage + 2)) != -1;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    ajoutCredit(): void {
        this.snackartService.openModal(AjoutCreditComponent, '43rem', 'new', '', '', '', () => {
            this.getCredit();
          });
    }
    suspendreCredit(credit){
        this.snackartService.openModal(SuspensionCreditComponent, '43rem', 'new', '', credit, credit, () => {
            this.getCredit();
        });
    }

    detailsCredit(credit: any) {
        this.showVue = !this.showVue;
        this.currentCredit = credit;
        if(this.typeCompteAffiche == 'inactif'){
            this.comptes =  this.currentCredit.comptesCredit.filter(el=>el.soldeIndicatif!=0)
        }else if(this.typeCompteAffiche == 'tous'){
            this.comptes = this.currentCredit.comptesCredit;
        }
        let cpt =  this.comptes.map(el=>el.id);
        if(!cpt.includes(this.currentCredit?.compteRemboursement?.id)) {
            this.comptes.unshift(this.currentCredit.compteRemboursement);
        }
        this.comptesDataSource =  new MatTableDataSource(this.comptes);
        this.coreService.encriptDataToLocalStorage('CD-@--124', this.currentCredit);
        this.getAmortissement();
        this.getListGarantiesCredit(this.currentCredit?.id);
        this.getFraisLierCredit(this.currentCredit?.id);
        this.getAttributComplementaireClient(this.currentCredit?.id);
    }
    getCompteAffiche(){
        if(this.typeCompteAffiche == 'inactif'){
            this.comptes =  this.currentCredit.comptesCredit.filter(el=>el.soldeIndicatif!=0)
        }else if(this.typeCompteAffiche == 'tous'){
            this.comptes = this.currentCredit.comptesCredit;
        }
        let cpt =  this.comptes.map(el=>el.id);
        if(!cpt.includes(this.currentCredit?.compteRemboursement?.id)) {
            this.comptes.unshift(this.currentCredit.compteRemboursement);
        }
        this.comptesDataSource =  new MatTableDataSource(this.comptes);
    }
    ajoutAttributComplementaire(currentCredit,attributComplementaires): void {
        this.dialogRef = this._matDialog.open(AjoutAttributComplementaireComponent, {
            autoFocus: true,
            width: '30rem',
            panelClass: 'event-form-dialog',
            data: {
                action: 'new',
                client: currentCredit,
                listAttribut: attributComplementaires,
                type: 'CREDIT',
                check: true
            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.getAttributComplementaireClient(currentCredit.id);
            }
        });
    }

    updateAttributComplementaire(attribut,currentCredit): void {
        this.dialogRef = this._matDialog.open(AjoutAttributComplementaireComponent, {
            autoFocus: true,
            width: '30rem',
            panelClass: 'event-form-dialog',
            data: {
                action: 'edit',
                client: currentCredit,
                attribut: attribut,
                type: 'CREDIT',
                check: true
            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.getAttributComplementaireClient(currentCredit.id);
            }
        });
    }
    demandeCredit(item) {
        this.changePage.emit('demande');
        this.coreService.encriptDataToLocalStorage('CD-@--12000', item);
    }
    captureScreen() {
        const nom = 'Tableau amortissement';
        const user = this.coreService.decriptDataToLocalStorage('CD-@--5');
        const donne = this.exempleGenPdfHeaderFooter(user.firstName + ' ' + user.lastName, nom);
        const doc = donne.doc;
        let col = this.displayedColumnsFile;
        let rows = [];
        let itemCurrent;
        let value = [];
        value = this.tableData;
        for (let item of value) {
            itemCurrent = item;
            const tabField = [];
            const elementKeys = Object.keys(item);
            let i = 0;
            for (const field of this.tabFileBody) {
                for (const element of elementKeys) {
                    if (field == element) {
                        if (field == 'createdAt' || field == 'dateNaiss' ||field == 'dateEcheance'|| field == 'dateCirculation' || field == 'dateDepart' || field == 'dateDarriver'|| field == 'datePremiereEcheance'|| field == 'dateDerniereEcheance') {
                            tabField.push(moment(itemCurrent[field]).format('DD/MM/YYYY') || '');
                        }
                        else if (itemCurrent[field] == 0 || itemCurrent[field] == '') {
                            tabField.push('0');
                        }else if (field === 'datePaiement' && itemCurrent[field] == null) {
                            tabField.push('');
                        }else if (field === 'datePaiement' && itemCurrent[field] != null) {
                            tabField.push(moment(itemCurrent[field]).format('DD/MM/YYYY') || '');
                        } else {
                            if (typeof itemCurrent[field] === 'object' && itemCurrent[field] != null) {
                                tabField.push(itemCurrent[field] ? itemCurrent[field]['intituleClient'] || itemCurrent[field]['libelle'] : '');

                            } else {
                                tabField.push(itemCurrent[field] || '');
                            }
                        }
                    }
                }
                i++;
            }
            rows.push(tabField);
        }
        // let valTable:UserOptions={head:col, body:rows};
        autoTable(doc, {head: [col], body: rows});
        doc.save(nom + '.pdf');
        this.snackbar.openSnackBar('Téléchargement réussi', 'OK', ['mycssSnackbarGreen']);
        // this.exporter = false;
    }
    exempleGenPdfHeaderFooter(userName, fileName) {
        const toDay = new Date();
        let marginX = 0;
        const doc = new jsPDF('l', 'mm', 'a4');
        const totalPagesExp = '{total_pages_count_string}';
        doc.setFillColor(0, 0, 255);
        const columns = ['               ', fileName];
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
                    doc.addImage(logo, 'JPEG', data.cell.x + 2, data.cell.y + 2, 30, 15);
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
                    doc.setTextColor(51, 122, 183);
                }
                if (data.row.section === 'head' && data.column.index === 1) {
                    doc.setFontSize(12);
                }
            },
        });
        return {doc: doc, marginX: marginX, totalPagesExp: totalPagesExp};
    }

    impressionCompte() {
        const nom = 'Comptes cient -- ' + this.currentClient?.intitule;
        const user = this.coreService.decriptDataToLocalStorage('CD-@--5');
        const donne = this.exempleGenPdfHeaderFooter(user.firstName + ' ' + user.lastName, nom);
        const doc = donne.doc;
        let col = this.displayedColumnsCompteFile;
        let rows = [];
        let itemCurrent;
        let value = [];
        value = this.comptes;
        for (let item of value) {
            itemCurrent = item;
            const tabField = [];
            const elementKeys = Object.keys(item);
            let i = 0;
            for (const field of this.comptesColumns) {
                for (const element of elementKeys) {
                    if (field == element) {
                        if (field == 'createdAt' || field == 'dateNaiss' ||field == 'dateEcheance'|| field == 'dateCirculation' || field == 'dateDepart' || field == 'dateDarriver'|| field == 'datePremiereEcheance'|| field == 'dateDerniereEcheance') {
                            tabField.push(moment(itemCurrent[field]).format('DD/MM/YYYY') || '');
                        }
                        else if (itemCurrent[field] == 0 || itemCurrent[field] == '') {
                            tabField.push('0');
                        }else if (field === 'datePaiement' && itemCurrent[field] == null) {
                            tabField.push('');
                        }else if (field === 'datePaiement' && itemCurrent[field] != null) {
                            tabField.push(moment(itemCurrent[field]).format('DD/MM/YYYY') || '');
                        } else {
                            if (typeof itemCurrent[field] === 'object' && itemCurrent[field] != null) {
                                tabField.push(itemCurrent[field] ? itemCurrent[field]['numero'] || itemCurrent[field]['libelle'] : '');

                            } else {
                                tabField.push(itemCurrent[field] || '');
                            }
                        }
                    }
                }
                i++;
            }
            rows.push(tabField);
        }
        // let valTable:UserOptions={head:col, body:rows};
        autoTable(doc, {head: [col], body: rows});
        doc.save(nom + '.pdf');
        this.snackbar.openSnackBar('Téléchargement réussi', 'OK', ['mycssSnackbarGreen']);
        // this.exporter = false;
    }
    getAttributComplementaireClient(idCredit) {
        this.isLoading = true;
        const data = {
            'natureAttribut': 'CREDIT',
            'referenceObjet': idCredit
        };
        this.coreService.getAttributComplementaire(data, 'attribut-complementaire/mine').subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;
                this.attributComplementaires = resp[this.constantes.RESPONSE_DATA];

                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoading = false;
            }
        }, () => {
            this.isLoading = false;
        });
    }
    changeStatus(status: string, modalTemplate?: TemplateRef<any>): void {
        let verbe = '';
        let conjugate = '';
        let url = '';
        if (status === this.constantes.STATUS.VALIDE) {
            verbe = 'valider';
            conjugate = 'validé';
            url = 'credit/valider';
            this.openSwal('Confirmation', verbe, 'warning', 'Valider', 'Annuler').then((result) => {
                if (result['value'] == true) {
                    this.isLoading = true;
                    this.clientServive.changeStatusCredit(url, this.currentCredit?.id).subscribe((resp) => {
                        this.openSnackBar(`Le crédit a été ${conjugate} avec succès !`, 'OK', 10000, 'mycssSnackbarGreen');
                        this.currentCredit.statut = resp['statut'];
                        this.getCredit();
                        this.getFraisLierCredit(this.currentCredit?.id);
                        this.isLoading = false;
                        this._changeDetectorRef.detectChanges();
                    }, (error:HttpErrorResponse) => {
                        this.isLoading = false;
                        this.snackartService.showErrors(error);
                    });
                }
            });
        } else if (status === this.constantes.STATUS.ANNULE) {
            this.dialogRef = this._matDialog.open(modalTemplate, {
                autoFocus: true,
                width: '45rem',
                panelClass: 'event-form-dialog'
            });
            this.dialogRef.afterClosed().subscribe((resp) => {
                if (resp) {
                    this.currentCredit.statut = 'REJETE';
                    this._changeDetectorRef.detectChanges();
                }
            });

        }
        this.getCredit();
    }

    basculerEnSouffrance( status?,modalTemplateBascule?: TemplateRef<any>): void {
    if(status === 'bascule') {
        this.dialogRef = this._matDialog.open(modalTemplateBascule, {
            autoFocus: true,
            width: '45rem',
            panelClass: 'event-form-dialog'
        });
    }else if(status === 'basculer') {
        const url = 'basculement-en-souffrance';
        this.openSwal('Confirmation', '', 'warning', 'Valider', 'Annuler').then((result) => {
            if (result['value'] == true) {
                this.isLoading = true;
                let data ={
                    "creditId":this.currentCredit?.id,
                    "motifBasculement":this.initBasculerForm.get('motifBasculement').value
                }
                this.clientServive.basculerCredit(url,data).subscribe((resp) => {
                    this.openSnackBar(`Le crédit en cours de basculement !`, 'OK', 10000, 'mycssSnackbarGreen');
                    this.currentCredit.statut = resp['statut'];
                    this.getCredit();
                    this.getFraisLierCredit(this.currentCredit?.id);
                    this.isLoading = false;
                    this.dialogRef.close();
                    this._changeDetectorRef.detectChanges();
                }, (error: HttpErrorResponse) => {
                    this.isLoading = false;
                    this.snackartService.showErrors(error);
                });
            }
        });
        this.getCredit();
    }
    }
    basculerEnPerte(): void {
            const url = 'basculement-en-perte';
            this.openSwal('Confirmation', 'basculer en perte', 'warning', 'Valider', 'Annuler').then((result) => {
                if (result['value'] == true) {
                    this.isLoading = true;
                    this.clientServive.changeStatusCredit(url,this.currentCredit?.id).subscribe((resp) => {
                        this.openSnackBar(`Le crédit a été basculé avec succès !`, 'OK', 10000, 'mycssSnackbarGreen');
                        this.currentCredit.statut = resp['statut'];
                        this.getCredit();
                        this.getFraisLierCredit(this.currentCredit?.id);
                        this.isLoading = false;
                        this.dialogRef.close();
                        this._changeDetectorRef.detectChanges();
                    }, (error: HttpErrorResponse) => {
                        this.isLoading = false;
                        this.snackartService.showErrors(error);
                    });
                }
            });
            this.getCredit();
    }
    remboursement(): void {
        this.isLoading = true;
        this._changeDetectorRef.markForCheck();
        let url = 'tableau-amortissement/credit/'+this.currentCredit.id;
        this.coreService.liste(url).subscribe((response) => {
            if(response){
                this.total=response['tableauAmortissement'].filter(el=>el.statut==='NON_TRAITE').length;
                this.isLoading = false;
                this._changeDetectorRef.markForCheck();
        this.dialogRef = this._matDialog.open(DetailRemboursementComponent, {
            autoFocus: true,
            minWidth: '60rem',
            width: '30rem',
            panelClass: 'event-form-dialog',
            disableClose: true,
            data: {
                currentCredit: this.currentCredit,
                length: this.total
            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            this.tableauAmortissement();
            this.currentTab = 3;
            this._changeDetectorRef.markForCheck();
        },(error)=>{
            this.isLoading = false;
            this._changeDetectorRef.markForCheck();
        });

    }});
    }

    tableauAmortissement() {
        let url = 'tableau-amortissement/credit/'+this.currentCredit.id;
        this.coreService.liste(url).subscribe((response) => {
            if(response){
                // this.tableauAmortissements =  this.sortTables(response);
                this.tableData = response['tableauAmortissement'];
                this.tableauAmortissements =  this.sortTables(response['tableauAmortissement']);

                this.montantCapitalTotal = response['montantCapitalTotal'];
                this.montantEcheanceTotal = response['montantEcheanceTotal'];
                this.interetsTotals = response['interetsTotals'];
                this._changeDetectorRef.markForCheck();
            }
        });
    }
    sortTables(array) {
        array.sort(function (a, b) {
            return (a.numero) - (b.numero);
        });
        return array;
    }
    annulerCredit(): void {
        this.openSwal('Confirmation', 'annuler', 'warning', 'Valider', 'Annuler').then((result) => {
            if (result['value'] == true) {
                const value = this.initForm.value;
                this.clientServive.annulerCredit(this.currentCredit?.id, value).subscribe((resp) => {
                    this.openSnackBar('Le crédit a été annulé avec succès !', 'OK', 10000, 'mycssSnackbarGreen');
                    this.dialogRef.close(resp);
                }, (error) => {
                    this.snackartService.showErrors(error);
                });
            }
        });
    }
    getCreditParams() {
        this.isLoading = true;
        let line;
        this.coreService.getElement(this.paramsId, 'credits-client').subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;
                this.creditDataSource.data = this.sortTable(resp[this.constantes.RESPONSE_DATA]);
                this.tableCredit = resp[this.constantes.RESPONSE_DATA];
                let from =  this.coreService.decriptDataToLocalStorage('CD-@--129');
                const bol = this.creditSelect && from
                if(bol){
                    line = this.tableCredit.find(el => el.numero == this.creditSelect);
                    if (line) {
                        this.detailsCredit(line);
                    }
                }

                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoading = false;
            }
        }, () => {
            this.isLoading = false;
        });

    }
    getCredit() {
        this.isLoading = true;
        this.coreService.getElement(this.paramsId, 'credits-client').subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;
                this.creditDataSource.data = this.sortTable(resp[this.constantes.RESPONSE_DATA]);
                this.tableCredit = resp[this.constantes.RESPONSE_DATA];
                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoading = false;
            }
        }, () => {
            this.isLoading = false;
        });

    }


    getListGarantiesCredit(creditId) {
        this.coreService.getElement(creditId, 'garanties-credit').subscribe((resp) => {
            if (resp) {
                this.isLoading = false;
                this.depotGaranties = resp['data'];
                //  let depotGaranties = resp;

                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoading = false;
            }
        }, () => {
            this.isLoading = false;
        });
    }

    openSwal(title: string, verbe: string, icon: SweetAlertIcon, confirmButtonText: string, cancelButtonText: string): Promise<SweetAlertResult<any>> {
        return swal.fire({
            title: title,
            text: `Voulez-vous vraiment ${verbe} ce crédit?`,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        });
    }
    openSnackBar(message: string, action: string, duration: number, classe: string): void {
        this.snackBar.open(message, action, {
            verticalPosition: 'bottom',
            duration: duration?duration:10000,
            panelClass: [classe]
        });
    }


    getAmortissement() {
        const data = {
            'montantCredit': this.currentCredit?.montant,
            'tauxInteret': this.currentCredit?.taux,
            'dureeCredit': this.currentCredit?.nombreEcheance,
            'typeAmortissement': (this.currentCredit?.typeCredit?.modeCalculAmortissement).toLowerCase(),
            'frequenceInteret': (this.currentCredit?.typeCredit?.frequenceCalculInteret).toLowerCase(),
            'differeMois': this.currentCredit?.dureeDiffereMois,
            'dateMiseEnPlace': moment(this.currentCredit?.dateMiseEnPlace).format('YYYY-MM-DD')
        };
        let url = 'tableau-amortissement/credit/'+this.currentCredit.id;
        this.isLoading = true;
        this.coreService.liste(url).subscribe((resp) => {
            if (resp) {
                this.isLoading = false;
                this.tableData = resp[this.constantes?.TABLEAUAMORTISSEMENT];
                this.tableauAmortissements = this.sortTables(resp[this.constantes?.TABLEAUAMORTISSEMENT]);
                this.montantCapitalTotal = resp['montantCapitalTotal'];
                this.montantEcheanceTotal = resp['montantEcheanceTotal'];
                this.interetsTotals = resp['interetsTotals'];
                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoading = false;
            }
        }, () => {
            this.isLoading = false;
        });
    }


    financerCredit(): void {
        this.dialogRef = this._matDialog.open(FinancerCreditComponent, {
            autoFocus: true,
            width: '70rem',
            panelClass: 'event-form-dialog',
            disableClose: true,
            data: {
                credit: this.currentCredit,
                action: 'new',
            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            this.getAmortissement();
            if (resp) {
                this.currentCredit = resp;
                if(this.currentCredit.comptesCredit?.length != 0) {
                    this.comptes.unshift(this.currentCredit.comptesCredit[0]);
                }
                this.comptesDataSource = new MatTableDataSource(this.comptes);
                this.currentCredit.statut = resp['statut'];
                this.getCredit();
                this._changeDetectorRef.detectChanges();
            }
        });
    }


    sortTable(array) {
        array.sort(function(a, b) {
            return + new Date(b.createdAt) - (+new Date(a.createdAt));
        });
        return array;
    }

    addItem(updatedItem: any) {
        this.getListGarantiesCredit(this.currentCredit?.id);
        this._changeDetectorRef.detectChanges();
    }



    getFraisLierCredit(currentCreditId) {
        this.isLoading = true;
        this.coreService.list('credit-frais-lies/' + currentCreditId, 0, 100).subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;
                this.fraisLierCredit = resp[this.constantes.RESPONSE_DATA];
                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoading = false;
            }
        }, () => {
            this.isLoading = false;
        });

    }
    reportTypeCredit(): void {
        this.snackbar.openModal(ReportTypeCreditComponent, '23rem', 'new', '', this.currentCredit, 'credit', () => {
            this.getAmortissement();
        });
    }

    protected readonly CONSTANTES = CONSTANTES;
}
