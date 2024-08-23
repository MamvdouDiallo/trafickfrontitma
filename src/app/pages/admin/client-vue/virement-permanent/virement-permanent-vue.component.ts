import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, EventEmitter,
    OnInit, Output, TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
import { AjoutPersonneLieComponent } from '../personne-lie/ajout-personne-lie/ajout-personne-lie.component';
import { AjoutVirementPermanentVueComponent } from './ajout-virement-permanent-vue/ajout-virement-permanent-vue.component';
// import { DetailRemboursementComponent } from './details-remboursement/detail-remboursement.component';
// import { FinancerCreditComponent } from './financer-credit/financer-credit.component';
import { SnackBarService } from 'app/core/auth/snackBar.service';
import {HttpErrorResponse} from "@angular/common/http";
import {MotifDeblocageComponent} from "../../admin/motif-deblocage/motif-deblocage.component";
import {ValiderCommiteComponent} from "../../admin/valider-commite/valider-commite.component";


@Component({
    selector: 'vue-virement-permanent',
    templateUrl: './virement-permanent-vue.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VirementPermanentVueComponent implements OnInit {
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator)
    set _paginator(value: MatPaginator) {
        if (value !== undefined && this.dataSource) {
            this.dataSource.paginator = value;
        }
    }

    @ViewChild('signataireTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;
    data: any;
    virementDataSource: MatTableDataSource<any> = new MatTableDataSource();
    creditColumns: string[] = ['numero', 'client', 'montantVirement', 'periodicite','dateMiseEnPlace','nbreJourRechercheProvision', 'statut', 'action'];
    dialogRef: any;
    isLoading: boolean = false;
    offset: number = 0;
    informations: any;
    pageSize: number = 10;
    constantes = CONSTANTES;
    infosClient: any;
    paramsId: any;
    agenceId: any;
    datas: any = [];
    length: number;
    showVue: boolean = false;
    currentCredit: any;
    tableData = [];
    initForm: UntypedFormGroup;
    initBasculerForm: UntypedFormGroup;
    dateComptable;
    currentIndex;
    depotGaranties = [];
    tableVirement = [];
    showLoader = 'isNotShow';
    montantCapitalTotal: any;
    montantEcheanceTotal: any;
    total: any;
    interetsTotals: number;
    fraisLierCredit: any;
    creditSelect: any;
    attributComplementaires: any = [];
    currentTab = 0;
    comptesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    comptes = [];
    tableauAmortissements:any;
    numDemande;

    montantAccorde;
    nmbreEcheance;
    differeJour;
    agentCred;
    /**
     * Constructor
     */
    constructor(
        private clientServive: ClientVueService,
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private coreService: CoreService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private formBuilder: UntypedFormBuilder,
        private snackbar: SnackBarService,
        private snackartService : SnackBarService
    ) {
        if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
            this.data = this.router.getCurrentNavigation().extras.state.extraData.data;
        }
        this.agenceId = this.coreService.decriptDataToLocalStorage('CD-@2');
        this.dateComptable = this.coreService.decriptDataToLocalStorage('DC-@--1');

        this.route.params.subscribe((params) => {
            this.paramsId = params['id'];
        });
        this.creditSelect = this.coreService.decriptDataToLocalStorage('CD-@--119');
        this.numDemande = this.coreService.decriptDataToLocalStorage('CD-@--12000');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.initForm = this.formBuilder.group({
            motifRejet: this.formBuilder.control(null, [Validators.required]),
        });
        this.initBasculerForm = this.formBuilder.group({
            motifBasculement: this.formBuilder.control(null, [Validators.required]),
        });
        this.getListVirement();
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

    ajoutVirementPerm(): void {
        this.snackartService.openModal(AjoutVirementPermanentVueComponent, '43rem', 'new', '', '', '', () => {
            this.getListVirement();
          });
    }

    detailsCredit(credit: any) {
        this.showVue = !this.showVue;
        this.currentCredit = credit;
        this.comptes = this.currentCredit?.comptesCredit;

        this.comptesDataSource =  new MatTableDataSource(this.comptes);
        this.coreService.encriptDataToLocalStorage('CD-@--124', this.currentCredit);

    }
    validerDemandeCredit(data): void {
        this.currentIndex = data;
        this.showLoader = 'isShow';
        this.snackbar.showConfirmation('Voulez-vous vraiment valider cette demande crédit ?').then((result) => {
            if (result['value'] == true) {
                const id = data?.id;
                const datas = ''
                this.coreService.validerDemandeCred(datas, id, 'demandes-credits/valider').subscribe((resp) => {
                    this.snackbar.openSnackBar('Demande de crédit validée avec succés', 'OK', ['mycssSnackbarGreen']);
                    this.showLoader = 'isNotShow';
                    this.getListVirement();
                }, (error) => {
                    this.showLoader = 'isNotShow';
                    this.snackbar.showErrors(error);
                });
            }
        });
    }




    rejeterVirementPermanent(el) {
        if (el) {
            const ElemRejet = el;
            this.snackbar.openModalTransaction(MotifDeblocageComponent, '35rem', 'new', '', ElemRejet, null, null, () => {
                this.getListVirement();
            });
        }
    }
    validerVirementPermanent(data): void {
        // this.deleteUser = true;
        this.currentIndex = data;
        // this.showLoader = 'isShow';
        this.snackbar.showConfirmation('Voulez-vous vraiment valider ce virement permanent ?').then((result) => {
            if (result['value'] == true) {
                this.showLoader = 'isShow';
                const id = data?.id;
                const datas = ''
                this.coreService.validerDemandeCred(datas, id, 'virements-permanents/valider').subscribe((resp) => {
                    this.snackbar.openSnackBar('Virement validé avec succés', 'OK', ['mycssSnackbarGreen']);
                    this.getListVirement();
                }, (error) => {
                    this.showLoader = 'isNotShow';
                    // this.deleteUser = false;
                    this.snackbar.showErrors(error);
                });
            } else {
                this.showLoader = 'isNotShow';
            }
        });
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
                    this.openSnackBar(`Le crédit a été basculé avec succès !`, 'OK', 10000, 'mycssSnackbarGreen');
                    this.currentCredit.statut = resp['statut'];
                    this.getListVirement();
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
        this.getListVirement();
    }
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
                    this.openSnackBar('La demande a été annulé avec succès !', 'OK', 10000, 'mycssSnackbarGreen');
                    this.dialogRef.close();
                }, (error) => {
                    this.snackartService.showErrors(error);
                });
            }
        });
    }
    getListVirement() {
        this.isLoading = true;

        this.coreService.listv2('virements-permanents'+'?clientId=' + this.paramsId + '&agenceId=' + this.agenceId?.id, this.offset, this.pageSize)
            .subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;

                this.tableVirement = resp[this.constantes.RESPONSE_DATA];
                this.virementDataSource.data = this.sortTable(this.tableVirement);

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
        // const data = {
        //     'montantCredit': this.currentCredit?.montant,
        //     'tauxInteret': this.currentCredit?.taux,
        //     'dureeCredit': this.currentCredit?.nombreEcheance,
        //     'typeAmortissement': (this.currentCredit?.typeCredit?.modeCalculAmortissement).toLowerCase(),
        //     'frequenceInteret': (this.currentCredit?.typeCredit?.frequenceCalculInteret).toLowerCase(),
        //     'differeMois': this.currentCredit?.dureeDiffereMois,
        //     'dateMiseEnPlace': moment(this.currentCredit?.dateMiseEnPlace).format('YYYY-MM-DD')
        // };
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


    // financerCredit(): void {
    //     this.dialogRef = this._matDialog.open(FinancerCreditComponent, {
    //         autoFocus: true,
    //         width: '70rem',
    //         panelClass: 'event-form-dialog',
    //         disableClose: true,
    //         data: {
    //             credit: this.currentCredit,
    //             action: 'new',
    //         }
    //     });
    //     this.dialogRef.afterClosed().subscribe((resp) => {
    //         this.getAmortissement();
    //         if (resp) {
    //             this.currentCredit.statut = resp['statut'];
    //             this.getListVirement();
    //             this._changeDetectorRef.detectChanges();
    //         }
    //     });
    // }


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

    protected readonly CONSTANTES = CONSTANTES;
}
