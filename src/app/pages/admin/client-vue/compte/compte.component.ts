import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBarService} from 'app/core/auth/snackBar.service';
import {CoreService} from 'app/core/core/core.service';
import * as moment from 'moment';
import {CloturerCompteComponent} from '../../admin/cloturer-compte/cloturer-compte.component';
import {CONSTANTES} from '../../admin/model/constantes';
import {
    DetailTransactionComponent
} from '../../transaction-vue/gestionnaire/detail-transaction/detail-transaction.component';
import {ReleveCompteComponent} from '../../transaction-vue/gestionnaire/releve-compte/releve-compte.component';
import {
    AjoutAttributComplementaireComponent
} from '../info-client/ajout-attribut-complementaire/ajout-attribut-complementaire.component';
import {AjoutSignataireComponent} from '../signataires/ajout-signataire/ajout-signataire.component';
import {AjoutCompteComponent} from './ajout-compte/ajout-compte.component';
import {AjoutReservationComponent} from './ajout-reservation/ajout-reservation.component';
import {AjoutMandataireComponent} from "./ajout-mandataire/ajout-mandataire.component";
import {
    DetailHistoriqueTransactionComponent
} from "../../admin/detail-historique-transaction/detail-historique-transaction.component";
import {
    MotifAnnulationTransactionJourComponent
} from "../../admin/recherche/motifAnnulation-transaction-jour/motifAnnulation-transaction-jour.component";
import {MotifReouvertureComponent} from "../../admin/motif-reouverture/motif-reouverture.component";


@Component({
    selector: 'compte',
    templateUrl: './compte.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompteComponent implements OnInit {
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatSort) private _sort: MatSort;

    @ViewChild(MatPaginator)
    set _paginator(value: MatPaginator) {
        if (value !== undefined && this.dataSource) {
            this.dataSource.paginator = value;
        }
    }

    @ViewChild('signataireTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;
    data: any;
    compteDataSource: MatTableDataSource<any> = new MatTableDataSource();
    compteColumns: string[] = ['numero','compteGeneral', 'typeCompte','soldeCompte', 'dateCreated', 'statut', 'action'];
    reservationDataSource: MatTableDataSource<any> = new MatTableDataSource();
    mandataireDataSource: MatTableDataSource<any> = new MatTableDataSource();
    signatairesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    reservationColumns: string[] = ['montant', 'motif', 'dateCreated', 'action'];
    mandataireColumns: string[] = ['prenom', 'nom', 'telephone', 'date', 'action'];
    releveJourColumns: string[] = ['numeroOperation', 'libelleEcriture', 'montant', 'dateOperation','action'];
    releveJorColumns: string[] = ['date', 'operation', 'montant', 'statut', 'action'];
    signatairesColumns: string[] = ['personnePhysique', 'montantMaxAutorise', 'periodiciteMontantMax'];
    dialogRef: any;
    isLoading: boolean;
    isLoader: boolean;
    offset: number = 0;
    informations: any;
    pageSize: number = 10;
    constantes = CONSTANTES;
    infosClient: any;
    hitoriquesTransactions = [];
    soldeCompte;
    hitoriquesTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
    transactionsJour = [];
    listSignataire = [];
    transactionsJourDataSource: MatTableDataSource<any> = new MatTableDataSource();
    paramsId: any;
    datas: any = [];
    compteId: any;
    length: number;
    showVue: boolean = false;
    currentCompte: any;
    clientId: any;
    currentIndex;
    currentClient: any;
    dateStart: any;
    dateEnd: any;
    dateDebut: any;
    minDateDebut = new Date();
    typeTransaction: any = [];
    comptes: any = [];
    dateHisto;
    listFraisLier = [];
    dateHistoR;
    verifDate: boolean = false;
    today = new Date();
    attributComplementaires: any = [];
    infosClotureCompte: any;
    currentTab = 0;
    typeCompte: string;
    dateComptable;
    showLoader = 'isNotShow';
    deleteUser: boolean = false;
    motifAnnulation;

    /**
     * Constructor
     */
    constructor(
        private _matDialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private coreService: CoreService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private snackbar: SnackBarService
    ) {
        if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
            this.data = this.router.getCurrentNavigation().extras.state.extraData.data;
        }
        this.dateComptable = this.coreService.decriptDataToLocalStorage('DC-@--1');
        this.dateStart = this.dateComptable;
        this.dateEnd = this.dateComptable;
        this.route.params.subscribe((params) => {
            this.paramsId = params['id'];
        });
        this.currentClient = this.coreService.decriptDataToLocalStorage('CD-@--119');
        this.clientId = this.coreService.decriptDataToLocalStorage('CD-@--119');

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the data
        this.getCompte();
        this.getAllTypeTransaction();
        if (this.currentCompte) {
            this.getReservationFonds(this.currentCompte?.id);
            this.getMandataire(this.currentCompte?.id);
        }
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

    motifAnnulationTransaction(data): void {
        this.dialogRef = this._matDialog.open(MotifAnnulationTransactionJourComponent, {
            autoFocus: true,
            width: '28rem',
            panelClass: 'event-form-dialog',
            disableClose: true,
            data: {
                action: 'new',
                modele: 'extourne',
                note: {}
            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp && resp['motif']) {
                this.motifAnnulation=resp['motif'];
                this.annulerTransaction(data,this.motifAnnulation);
            }
        });
    }
    annulerTransaction(data,motifAnnulation): void {
        this.snackbar.showConfirmation('Voulez-vous vraiment annuler cette transaction ?')
            .then((result) => {
                if (result['value'] == true) {
                    this.deleteUser = true;
                    this.currentIndex = data;
                    this.showLoader = 'isShow';
                    const dataVirement = {
                        'transactionId': data.id,
                        'motif':motifAnnulation
                    };
                    this.coreService.annulerTransaction(dataVirement).subscribe((resp) => {
                        this.snackbar.openSnackBar('Transaction annulée avec succés', 'OK', ['mycssSnackbarGreen']);
                        this.showLoader = 'isNotShow';
                        this.transactionsjour(this.currentCompte?.id);
                    }, (error) => {
                        this.showLoader = 'isNotShow';
                        this.deleteUser = false;
                        this.snackbar.showErrors(error);
                    });
                }
            });
    }

    getAllTypeTransaction() {
        this.coreService.list('type-transaction', 0, 100)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.typeTransaction = response['data'];
                    this._changeDetectorRef.markForCheck();
                }
            });
    }

    voirDetailTransaction(fields): void {
        this.snackbar.openModal(DetailTransactionComponent, '70rem', 'new', '', fields, '', () => {
        });
    }
    voirDetail(value): void {
        if (value) {
            const val = value;
            this.snackbar.openModal(DetailHistoriqueTransactionComponent, '70rem', 'new', '', val, '', () => {
            });
        }
    }

    releveCompte() {
        this.dialogRef = this._matDialog.open(ReleveCompteComponent, {
            width: '60rem',
            panelClass: 'event-form-dialog',
            disableClose: true,
            data: {
                compte: this.comptes,
                currentCompte: this.currentCompte,
                transactions: this.hitoriquesTransactions,
                soldeCompte: this.soldeCompte,
                date: this.dateHistoR
            }
        });
    }

    activerDesactiver(compte, statut) {
        let type = '';
        let mess = '';
        let url;
        if (statut == 'BLOQUE') {
            type = 'desactiver';
            mess = 'desactivé';
            url='compte-bloquer';
        } else {
            type = 'activer';
            mess = 'activé';
            url='compte-debloquer';
        }
        this.snackbar.showConfirmation('Voulez-vous vraiment ' + type + ' ce compte ?').then((result) => {
            if (result['value'] == true) {
                this.isLoader=true;
                this._changeDetectorRef.markForCheck();
                // compte.statut = statut;
                this.coreService.locked(url,compte)
                    .subscribe(
                        (response) => {
                            this._changeDetectorRef.markForCheck();
                            if (response['responseCode'] === 200) {
                                this.snackbar.openSnackBar('compte ' + mess + ' avec succés !', 'OK', ['mycssSnackbarGreen']);
                                compte.statut = statut;
                                this.isLoader=false;
                            } else {
                                this.snackBar.open(response['message'], 'OK', {
                                    verticalPosition: 'bottom',
                                    duration: 2000,
                                    panelClass: ['mycssSnackbarRed']
                                });
                                this.isLoader=false;
                                this._changeDetectorRef.markForCheck();
                            }

                        },
                        (error) => {
                            this.snackbar.showErrors(error);
                            this.isLoader=false;
                            this._changeDetectorRef.markForCheck();
                        }
                    );
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    InitialDateFin() {
        this.dateDebut = this.dateStart;
        if (this.dateDebut == 'Invalid Date') {
            this.dateDebut = new Date();
        } else if (this.dateDebut != null && this.dateDebut != 'Invalid Date') {
            this.minDateDebut = new Date(this.dateDebut);
        }
    }

    historiqueTransaction() {
        this.isLoader = true;
        this.verifDate = true;
        this._changeDetectorRef.markForCheck();
        const dateDebutR = moment(this.dateStart).format('DD-MM-YYYY');
        const dateFinR = moment(this.dateEnd).format('DD-MM-YYYY');
        this.dateHistoR = {
            'dateDebut': dateDebutR,
            'dateFin': dateFinR,
        };
        const dateDebut = moment(this.dateStart).format('YYYY-MM-DD');
        const dateFin = moment(this.dateEnd).format('YYYY-MM-DD');
        this.dateHisto = {
            'dateDebut': dateDebut,
            'dateFin': dateFin,
        };
        const url = 'releve-compte?compte=' + this.currentCompte?.id + '&dateDebut=' + dateDebut + '&dateFin=' + dateFin;
        this.coreService.getAllTransaction(url).subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoader = false;
                this.hitoriquesTransactionsDataSource = resp[this.constantes.RESPONSE_DATA];
                this.hitoriquesTransactions = resp[this.constantes.RESPONSE_DATA];
                this.soldeCompte = resp;
                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoader = false;
                this._changeDetectorRef.markForCheck();
            }
        }, () => {
            this.isLoader = false;
            this._changeDetectorRef.markForCheck();
        });
    }

    transactionsjour(idcompte) {
        this.isLoader = true;
        this._changeDetectorRef.markForCheck();
        this.coreService.getTransactionJour(idcompte, 'transaction-compte-du-jour?compte=').subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoader = false;
                this.transactionsJourDataSource = resp[this.constantes.RESPONSE_DATA];
                this.transactionsJour = resp[this.constantes.RESPONSE_DATA];
                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoader = false;
                this._changeDetectorRef.markForCheck();
            }
        }, () => {
            this.isLoader = false;
            this._changeDetectorRef.markForCheck();
        });
    }

    signataireslist(compteId) {
        this.isLoader = true;
        this._changeDetectorRef.markForCheck();
        this.coreService.list('signataire-client/' + compteId, this.offset, this.pageSize).subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoader = false;
                this.signatairesDataSource = resp[this.constantes.RESPONSE_DATA];
                this.listSignataire = resp[this.constantes.RESPONSE_DATA];
                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoader = false;
                this._changeDetectorRef.markForCheck();
            }
        }, () => {
            this.isLoader = false;
            this._changeDetectorRef.markForCheck();
        });
    }

    ajoutCompte(): void {
        this.snackbar.openModal(AjoutCompteComponent, '43rem', 'new', '', '', '', () => {
            this.getCompte();
        });
    }

    detailsCompte(compte) {
        this.showVue = !this.showVue;
        this.currentCompte = compte;
        this.typeCompte = this.currentCompte.typeCompte.categorie.code;

        this.getReservationFonds(compte?.id);
        this.getMandataire(compte?.id);

        this.getFraisLier(compte?.id);
        this.signataireslist(compte?.client?.id);
        this.getAttributComplementaireClient(compte?.id);
        this.getCompte(compte?.id);
    }
    // leverCompte(compte){
    //     this.snackbar.showConfirmation('Voulez-vous vraiment rendre le compte ouvert ?').then((result) => {
    //         if (result['value'] == true) {
    //             this.isLoading = true;
    //             this._changeDetectorRef.markForCheck();
    //             let data = {
    //                 'motif': "ouverture pour test",
    //                 'pieceJustificative': "test0001"
    //             }
    //             this.coreService.leverCompteInactif(compte).subscribe((resp) => {
    //                 this.getMandataire(this.currentCompte?.id);
    //                 if (resp) {
    //
    //                     this.isLoading = false;
    //                     this.snackbar.openSnackBar('Compte inactif levé avec succés', 'OK', ['mycssSnackbarGreen']);
    //                     // compte.statut = resp['statut'];
    //                     this.getCompte();
    //                     this._changeDetectorRef.markForCheck();
    //                      }
    //             }, () => {
    //                 this.isLoading = false;
    //                 this._changeDetectorRef.markForCheck();
    //             });
    //         }
    //     });
    //
    // }

    ajoutAttributComplementaire(currentCompte, listAttributCompl): void {

        this.dialogRef = this._matDialog.open(AjoutAttributComplementaireComponent, {
            autoFocus: true,
            width: '30rem',
            panelClass: 'event-form-dialog',
            data: {
                action: 'new',
                client: currentCompte,
                listAttribut: listAttributCompl,
                type: 'COMPTE',
                check: true
            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.getAttributComplementaireClient(currentCompte.id);
            }
        });
    }

    updateAttributComplementaire(attribut, currentCompte): void {
        this.dialogRef = this._matDialog.open(AjoutAttributComplementaireComponent, {
            autoFocus: true,
            width: '30rem',
            panelClass: 'event-form-dialog',
            data: {
                action: 'edit',
                client: currentCompte,
                attribut: attribut,
                type: 'COMPTE',
                check: true
            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.getAttributComplementaireClient(currentCompte.id);
            }
        });
    }

    getAttributComplementaireClient(idCompte) {
        this.isLoading = true;
        const data = {
            'natureAttribut': 'COMPTE',
            'referenceObjet': idCompte
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

    cloturerCompte(): void {
        this.isLoader=true;
        this._changeDetectorRef.markForCheck();
        this.coreService.getElement(this.currentCompte?.id, 'compte-cloturer-prep')
            .subscribe((response) => {
                this.infosClotureCompte = response;
                this.isLoader=false;
                this._changeDetectorRef.markForCheck();
                this.dialogRef = this._matDialog.open(CloturerCompteComponent, {
                    autoFocus: true,
                    minWidth: '50rem',
                    panelClass: 'event-form-dialog',
                    disableClose: true,
                    data: {
                        infosClotureCompte: this.infosClotureCompte,
                        compte: this.currentCompte?.id
                    }
                });
                this.dialogRef.afterClosed().subscribe((resp) => {
                    if (resp) {
                        this.isLoader=false;
                        this._changeDetectorRef.markForCheck();
                    }
                });

            });
    }

    getCompte(compteId?) {
        this.isLoading = true;
        this.coreService.listv2('comptes?clientId=' + this.paramsId, this.offset, 100000,).subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;
                let compte = resp[this.constantes.RESPONSE_DATA].filter(el=>el.typeCompte.categorie.code != 'CREDIT');
                this.compteDataSource.data = compte;
                this.comptes = resp[this.constantes.RESPONSE_DATA];
                if (this.currentCompte) {
                    let comt = this.comptes.find(el => el.id == this.currentCompte.id);
                    this.currentCompte = comt;
                }
                if (this.comptes?.length != 0) {
                    if (compteId) {
                        this.transactionsjour(compteId);
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

    /**
     * Cette fonction permet d'obtenir les reservations propres au compte selectionné
     *
     * @param compteId
     * @return reservationDataSource
     */
    getReservationFonds(compteId) {
        this.isLoading = true;
        this.coreService.list('reservations-fonds/' + compteId, this.offset, this.pageSize).subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;
                this.reservationDataSource = this.sortTable(resp[this.constantes.RESPONSE_DATA]);
                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoading = false;
            }
        }, () => {
            this.isLoading = false;
        });
    }

    addReservationFond() {
        this.snackbar.openModal(AjoutReservationComponent, '43rem', 'new', '', '', this.currentCompte?.id, () => {
            this.getReservationFonds(this.currentCompte?.id);
            this.ajoutreservation();
        });
    }

    ajoutreservation() {
        this.currentTab = 0;
        this.getCompte();
        let comt = this.comptes.find(el => el.id == this.currentCompte.id);
        this.currentCompte = comt;
    }

    addMandataire() {
        this.snackbar.openModal(AjoutMandataireComponent, '43rem', 'new', '', this.currentCompte?.id, this.currentCompte?.id, () => {
            this.getMandataire(this.currentCompte?.id);
        });
    }
    leverCompte(compte) {
        this.dialogRef = this._matDialog.open(MotifReouvertureComponent, {
            autoFocus: true,
            width: '30rem',
            panelClass: 'event-form-dialog',
            data: {
                action: 'new',
                data: compte,

            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.getCompte(compte.id);
            }
        });
    }

    getMandataire(compteId) {
        this.isLoading = true;
        this.coreService.list('mandataires-compte/' + compteId, this.offset, this.pageSize).subscribe((resp) => {
            if (resp) {
                this.isLoading = false;
                this.mandataireDataSource = this.sortTable(resp[this.constantes.RESPONSE_DATA]);
                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoading = false;
            }
        }, () => {
            this.isLoading = false;
        });
    }
    supprimerMandataire(id) {
        this.snackbar.showConfirmation('Voulez-vous vraiment supprimer le mandataire ?').then((result) => {
            if (result['value'] == true) {
                this.isLoading = true;
                this._changeDetectorRef.markForCheck();
                this.coreService.deleteItem(id,'mandataire').subscribe((resp) => {
                    this.getMandataire(this.currentCompte?.id);
                    if (resp) {
                        this.isLoading = false;
                        this._changeDetectorRef.markForCheck();
                        this.snackbar.openSnackBar('mandataire supprimé avec succés', 'OK', ['mycssSnackbarGreen']);
                    }
                }, () => {
                    this.isLoading = false;
                    this._changeDetectorRef.markForCheck();
                });
            }
        });
    }

    /**
     * Cette fonction permet d'ajouter une nouvelle reservation
     */
    addSignataire() {
        this.snackbar.openModal(AjoutSignataireComponent, '43rem', 'new', '', '', this.currentCompte?.id, () => {
            this.signataireslist(this.currentClient?.id);
        });
    }


    /**
     * Cette fonction permet de modifier une reservation
     *
     * @param information
     */

    /**
     * Cette fonction permet de supprimer une reservation
     *
     * @param id
     */
    supprimerReservation(id) {
        this.snackbar.showConfirmation('Voulez-vous vraiment lever cette réservation ?').then((result) => {
            if (result['value'] == true) {
                this.coreService.liberer(id).subscribe((resp) => {
                    this.getReservationFonds(this.currentCompte?.id);
                    if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                        this.isLoading = true;
                        this.snackbar.openSnackBar('réservation levée avec succés', 'OK', ['mycssSnackbarGreen']);

                        this.currentTab = 0;
                        this.getCompte();
                        let comt = this.comptes.find(el => el.id == this.currentCompte.id);
                        this.currentCompte = comt;
                    }
                }, () => {
                    this.isLoading = false;
                });
            }
        });
    }
    getFraisLier(compteId) {
        this.isLoading = true;
        this.coreService.list('frais-by-compte/' + compteId, this.offset, this.pageSize).subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;
                this.listFraisLier = resp[this.constantes.RESPONSE_DATA];

                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoading = false;
            }
        }, () => {
            this.isLoading = false;
        });
    }

    sortTable(array) {
        array.sort(function (a, b) {
            return +new Date(b.dateCreated) - (+new Date(a.dateCreated));
        });
        return array;
    }

}
