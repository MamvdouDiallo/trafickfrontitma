import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'app/core/core/core.service';
import { CONSTANTES } from '../../admin/model/constantes';
import { ClientVueService } from '../client-vue.service';
import { AjoutDepotComponent } from './ajout-depot/ajout-depot.component';
import {SnackBarService} from "app/core/auth/snackBar.service";
import {MotifDeblocageComponent} from "../../admin/motif-deblocage/motif-deblocage.component";
import {TemplateConsentementComponent} from "../info-client/template-consentement/template-consentement.component";
import {MessageService} from "../../admin/message/message.service";
import {AvanceDatComponent} from "../../admin/avance-dat/avance-dat.component";
import {DetailDepotTermeComponent} from "../../admin/detail-depot-terme/detail-depot-terme.component";

@Component({
    selector       : 'depot-terme',
    templateUrl    : './depot-terme.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepotTermeComponent implements OnInit
{

    @ViewChild('depotTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;
    data: any;
    depotDataSource: MatTableDataSource<any> = new MatTableDataSource();
    depotColumns: string[] = ['typeDepotTerme','periodiciteCalculInteret','taux','nbreMois','capitalInitial','statut','action'];
    dialogRef: any;
    avancesColumns: string[] = ['userAvance','email','montantAvance','dateAvance'];
    isLoading: boolean = false;
    offset: number = 0;
    pageSize: number = 10;
    constantes = CONSTANTES;
    infosClient: any;
    paramsId: any;
    showVue: boolean = false;
    datas: any;
    currentTab = 0;
    dataAvance: any;
    panelOpenState = false;
    listetemplate: any;
isLoad: boolean = false;
    currentCredit: any;
    creditSelect: any;
    agenceId: any;
    currentClient;
avancesDataSource: MatTableDataSource<any> = new MatTableDataSource();
    /**
     * Constructor
     */
    constructor(
       private clientServive: ClientVueService,
       private _matDialog: MatDialog,
       private _changeDetectorRef: ChangeDetectorRef,
       private router: Router,
       private coreService: CoreService,
       private CoreService: CoreService,
       private messageService: MessageService,
       private route: ActivatedRoute,
       private snackbar: SnackBarService,
    )
    {
      if(this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state){
        this.data = this.router.getCurrentNavigation().extras.state.extraData.data;
       }
        this.agenceId = this.coreService.decriptDataToLocalStorage('CD-@2');
        this.creditSelect = this.coreService.decriptDataToLocalStorage('CD-@--123');
        this.currentClient = this.coreService.decriptDataToLocalStorage('CD-@--119');
       this.route.params.subscribe((params) => {
        this.paramsId = params['id'];
      });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

    this.getAllDepots(this.paramsId);

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
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }


    ajoutDepot(): void {
        this.dialogRef = this._matDialog.open(AjoutDepotComponent, {
          autoFocus: true,
          width: '45rem',
          panelClass: 'event-form-dialog',
          disableClose: true,
          data: {
            action: 'new',
            clientId: this.paramsId
          }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
          if (resp) {
            this.getAllDepots(this.paramsId);
          }
        });
      }
    details(item) {
        this.snackbar.openModal(DetailDepotTermeComponent, '65rem', 'new', '', item, '', () => {
        });
    }
      modifierDepot(data): void {
        this.dialogRef = this._matDialog.open(AjoutDepotComponent, {
          autoFocus: true,
          width: '35rem',
          panelClass: 'event-form-dialog',
          disableClose: true,
          data: {
            action: 'edit',
            depot: data
          }

        });
        this.dialogRef.afterClosed().subscribe((resp) => {
          if (resp) {
              this.getAllDepots(this.paramsId);
          }
        });
      }
    openModalDepot(el) {
        if (el) {
            const val = el;
            this.snackbar.openModalTransaction(MotifDeblocageComponent, '35rem', 'new', '', val, null, null, () => {
                this.coreService.listv2('depot-terme' + '?agenceId=' + this.agenceId?.id, this.offset, this.pageSize).subscribe((resp) => {
                    if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                        this.isLoading = false;
                        this.depotDataSource.data = resp['data'].filter(el => el.client.id === this.paramsId);

                        this._changeDetectorRef.markForCheck();
                    } else {
                        this.isLoading = false;
                    }
                }, (error) => {
                    this.isLoading = false;
                    this.snackbar.showErrors(error);
                });
            });
        }
    }

    supprimerItems(id, information) {
        this.snackbar.showConfirmation('Voulez-vous vraiment supprimer ce depot terme ?')
            .then((result) => {
                if (result['value'] == true) {
                    this.CoreService.deleteItem(id, 'depot-terme').subscribe((resp) => {
                        this.coreService.listv2('depot-terme' + '?agenceId=' + this.agenceId?.id, this.offset, this.pageSize).subscribe((resp) => {
                            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                                this.isLoading = false;
                                this.depotDataSource.data = resp['data'].filter(el => el.client.id === this.paramsId);
                                this._changeDetectorRef.markForCheck();
                            } else {
                                this.isLoading = false;
                            }
                        }, (error) => {
                            this.isLoading = false;
                        });

                    }, (error) => {
                        this.snackbar.showErrors(error);
                    });
                }
            });
    }

    openModalAvanceDepot(el) {
        if (el) {
            const val = el;
            this.snackbar.openModalTransaction(AvanceDatComponent, '35rem', 'new', '', val, null, null, () => {
                this.coreService.listv2('depot-terme' + '?agenceId=' + this.agenceId?.id, this.offset, this.pageSize).subscribe((resp) => {
                    this.isLoad = true;
                    if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                        this.isLoad = false;
                        this.depotDataSource.data = resp['data'].filter(el => el.client.id === this.paramsId);
                        this._changeDetectorRef.markForCheck();
                    } else {
                        this.isLoad = false;
                    }
                }, (error) => {
                    this.isLoad = false;
                    this.snackbar.showErrors(error);
                });
            });
        }
    }
     getAllDepots(clientId?) {
      this.isLoading = true;
      let line;
      this.coreService.listv2Depot('depot-terme'+ '?clientId=' + clientId + '&agenceId=' + this.agenceId?.id , this.offset, this.pageSize).subscribe((resp) => {
        if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
          this.isLoading = false;
           this.depotDataSource.data = resp['data']
            line = this.depotDataSource.data.find(el => el.numero === this.creditSelect);
            if (line) {
                this.detailsCredit(line);
            }
          this._changeDetectorRef.markForCheck();
        } else {
          this.isLoading = false;
        }
      }, (error) => {
        this.isLoading = false;
          this.snackbar.showErrors(error);
      });
    }
    detailsCredit(credit: any) {
        this.showVue = !this.showVue;
        this.currentCredit = credit;
        this.avancesDataSource = credit?.historiqueAvances
        this.dataAvance = this.avancesDataSource
    }
    validerDepot(dta) {
        this.snackbar.showConfirmation('Voulez-vous vraiment valider ce dépôt ?')
            .then((result) => {
                if (result['value'] == true) {

                    let url = 'depot-terme/valider/' + dta?.id
                    this.coreService.validerDepot(url).subscribe((resp) => {
                        this.isLoad = true;
                        if (resp){
                            this.isLoad = false;
                            this.snackbar.openSnackBar('Dépôt validé avec succés', 'OK', ['mycssSnackbarGreen']);
                            this.coreService.listv2('depot-terme' + '?agenceId=' + this.agenceId?.id, this.offset, this.pageSize).subscribe((resp) => {
                                if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                                    this.isLoading = false;
                                    this.depotDataSource.data = resp['data'].filter(el => el.client.id === this.paramsId);
                                    this._changeDetectorRef.markForCheck();
                                } else {
                                    this.isLoading = false;
                                }
                            }, (error) => {
                                this.isLoading = false;
                                this.snackbar.showErrors(error);
                            });
                        }

                    }, (error) => {
                        this.isLoad = false;
                    });
                }
            })
    }

    templateConsentementClient(el): void {
        const data = {
            'clientId': el.client?.id,
            'depotTermeId': el.id
        };
        this.messageService.templateContratClient(data).subscribe((response) => {
            const reponse = response;
            if (reponse['responseCode'] == 200) {
                this.listetemplate = reponse['data']['templateText'];
            }
            this.dialogRef = this._matDialog.open(TemplateConsentementComponent, {
                autoFocus: true,
                width: '50rem',
                panelClass: 'event-form-dialog',
                data: {
                    action: 'edit',
                    client: el,
                    templateClient: this.listetemplate,
                    check: true
                }
            });
            this.dialogRef.afterClosed().subscribe((resp) => {
                if (resp) {

                }
            });
        });
    }
}
