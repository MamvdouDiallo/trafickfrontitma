import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CONSTANTES} from '../../admin/model/constantes';
import {MatTableDataSource} from "@angular/material/table";
import {CoreService} from "app/core/core/core.service";
import {SnackBarService} from "app/core/auth/snackBar.service";


@Component({
    selector: 'transfert',
    templateUrl: './transfert-client.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransfertClientComponent implements OnInit {
    _attributComplementaire = [];
    @Input() infosClient;
    @Input() persPhysique;

    @Input()
    set attributComplementaire(data: any) {
        this._attributComplementaire = data ? data : [];
    }

    accountForm: UntypedFormGroup;
    data: any;
    paramsId: any;
    constantes = CONSTANTES;
    isLoading = false;
    isLoadings = false;
    dialogRef: any;
    responsable: any = [];
    statutJuridiques: any = [];
    countries: any = [];
    fraisClientDataSource: MatTableDataSource<any> = new MatTableDataSource();
    compteDataSource: MatTableDataSource<any> = new MatTableDataSource();
    creditDataSource: MatTableDataSource<any> = new MatTableDataSource();
    depotDataSource: MatTableDataSource<any> = new MatTableDataSource();
    fraisColumns: string[] = ['libelle','montantFrais','typePaiementFrais','dateGeneration','datePaiement','statut'];
    compteColumns: string[] = ['numero', 'typeCompte', 'dateCreated', 'statut'];
    creditColumns: string[] = ['numero', 'typeCredit', 'montant', 'taux', 'dateMiseEnPlace', 'nombreEcheance', 'statut', 'createdAt'];
    depotColumns: string[] = ['typeDepotTerme','periodiciteCalculInteret','taux','nbreMois','capitalInitial','statut'];
    comptes: any = [];
    tableCredit = [];
    agenceList: any;
    agenceId: any;
    agence;
    gestionnaire;
    gestionnaires: any = [];
    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private coreService: CoreService,
        private _changeDetectorRef: ChangeDetectorRef,
        private snackbar: SnackBarService,
        private route: ActivatedRoute
    ) {
        if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
            this.data = this.router.getCurrentNavigation().extras.state.extraData.data;
        }

        this.route.params.subscribe((params) => {
            this.paramsId = params['id'];
        });
        this.agenceId = this.coreService.decriptDataToLocalStorage('CD-@2');
    }
    ngOnInit(): void {
        this.getFraisClient(this.paramsId);
        this.getCompte();
        this.getCredit();
        this.getAllDepots(this.paramsId);
        this.listeAgence();
    }

    getFraisClient(clientId) {
        this.isLoading = true;
        this.coreService.list('frais-client-list/' + clientId,0,100,).subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;
                this.fraisClientDataSource.data = resp[this.constantes.RESPONSE_DATA].filter(item =>item?.client?.id == this.paramsId && item.statut == this.constantes.STATUS.NON_PAYE);
                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoading = false;
            }
        }, (error) => {
            this.isLoading = false;
        });
    }
    getCompte() {
        this.isLoading = true;
        this.coreService.listv2('comptes?clientId='+this.paramsId, 0, 100,).subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;
                this.compteDataSource.data = resp[this.constantes.RESPONSE_DATA];
                this.comptes = resp[this.constantes.RESPONSE_DATA];
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
    getAllDepots(clientId?) {
        this.isLoading = true;
        this.coreService.listv2('depot-terme' + '?agenceId=' + this.agenceId?.id, 0, 1000).subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;
                this.depotDataSource.data = resp['data'].filter(el => el.client.id === clientId);
                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoading = false;
            }
        });
    }
    sortTable(array) {
        array.sort(function(a, b) {
            return + new Date(b.createdAt) - (+new Date(a.createdAt));
        });
        return array;
    }

    listeAgence() {
        this.coreService.list('agence', 0, 1000).subscribe((resp) => {
            if (resp['responseCode'] == this.constantes.HTTP_STATUS.SUCCESSFUL) {
                    this.agenceList = resp[this.constantes.RESPONSE_DATA].filter(el => el.id !== this.agenceId.id);
                this._changeDetectorRef.markForCheck();
            }
        }, () => {
        });
    }
    transfertClient(){
        let url='client/transfert/'+this.paramsId;
        this.snackbar.showConfirmation('Voulez-vous vraiment transférer ce client ?').then((result) => {
            if (result['value'] == true) {
                this.isLoadings = true;
                const value = {
                    "agenceDestination": this.agence.id,
                    "gestionnaire": this.gestionnaire
                };
                this._changeDetectorRef.markForCheck();
                this.coreService.addItem(value,url)
                    .subscribe(
                        (response) => {
                            if (response['responseCode'] == this.constantes.HTTP_STATUS.SUCCESSFUL) {
                                this.isLoadings = false;
                                this._changeDetectorRef.markForCheck();
                                this.snackbar.openSnackBar('Client transféré avec succés', 'OK', ['mycssSnackbarGreen']);
                                this.router.navigate(['/admin/clients']);
                            }
                        },
                        (error) => {
                            this.isLoadings = false;
                            this.snackbar.showErrors(error);
                            this._changeDetectorRef.markForCheck();
                        }
                    );
            }
        });
    }
    getListGestionnaires(agenceId) {
        this.coreService.listv2('agent?agenceId=' + agenceId.id, 0, 10)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.gestionnaires = response['data'];
                    this._changeDetectorRef.markForCheck();
                }
            });
    }
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
