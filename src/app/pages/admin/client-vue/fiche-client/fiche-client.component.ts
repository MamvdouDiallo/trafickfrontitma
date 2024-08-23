import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CONSTANTES} from '../../admin/model/constantes';
import {MatTableDataSource} from "@angular/material/table";
import {CoreService} from "app/core/core/core.service";
import {ImpressionService} from "app/shared/Impression.service";


@Component({
    selector: 'fiche-client',
    templateUrl: './fiche-client.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FicheClientComponent implements OnInit {
    @ViewChild('productionHebdo', {static: false}) public productionHebdo: ElementRef;
    @Input() infosClient;
    @Input() persPhysique;
    accountForm: UntypedFormGroup;
    data: any;
    paramsId: any;
    constantes = CONSTANTES;
    isLoading = false;
    dialogRef: any;
    responsable: any = [];
    statutJuridiques: any = [];
    countries: any = [];
    fraisClientDataSource: MatTableDataSource<any> = new MatTableDataSource();
    compteDataSource: MatTableDataSource<any> = new MatTableDataSource();
    creditDataSource: MatTableDataSource<any> = new MatTableDataSource();
    depotDataSource: MatTableDataSource<any> = new MatTableDataSource();
    fraisColumns: string[] = ['libelle','montantFrais','dateGeneration','datePaiement','statut'];
    compteColumns: string[] = ['numero', 'typeCompte', 'dateCreated', 'statut'];
    creditColumns: string[] = ['numero', 'typeCredit', 'montant', 'taux', 'statut'];
    depotColumns: string[] = ['typeDepotTerme','periodiciteCalculInteret','taux','nbreMois','capitalInitial','statut'];
    comptes: any = [];
    tableCredit = [];
    agenceId: any;
    noImage = '';
    print:boolean=false;
    /**
     * Constructor
     */
    constructor(
        private router: Router,
        private coreService: CoreService,
        private _changeDetectorRef: ChangeDetectorRef,
        protected impressionService: ImpressionService,
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
        this.getClient(this.paramsId);
    }

    getFraisClient(clientId) {
        this.isLoading = true;
        this.coreService.list('frais-client-list/' + clientId,0,100,).subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;
                this.fraisClientDataSource.data = resp[this.constantes.RESPONSE_DATA].filter(item => item?.client?.id == this.paramsId);
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
    getFirstElementWord(value) {

        if (value) {
            return value.match(/(?<=(\s|^))[a-z]/gi).join('').toUpperCase();
        }
    }
    getClient(Id) {
        this.isLoading = true;
        this.coreService.getElement(Id,'client').subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;
                this.infosClient = resp[this.constantes.RESPONSE_DATA];
                this._changeDetectorRef.markForCheck();
                if(this.infosClient?.typeClient?.typePersonne == this.constantes.CLIENT.PP)
                {
                    if(this.infosClient?.personnePhysique?.photo != null)
                    {
                        this.noImage = this.infosClient?.personnePhysique?.photo;
                    }
                }
                else if(this.infosClient?.typeClient?.typePersonne == this.constantes.CLIENT.PM)
                {

                            if (this.infosClient?.personneMorale?.logo != null) {
                                this.noImage = this.infosClient?.personneMorale?.logo;
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
    captureScreen(autoPrint = false) {
        this.print = true;
        setTimeout(() => {

        this.impressionService.imprimer(this.productionHebdo, {
            fileName: 'Fiche-client',
            textColor: '#131523',
            fontSize: 11
        }, autoPrint, null, () => {
            this.print = false;
        });
        }, 500);
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
