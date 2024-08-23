import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SnackBarService } from 'app/core/auth/snackBar.service';
import { CoreService } from 'app/core/core/core.service';
import { CONSTANTES } from '../../../admin/model/constantes';
import { ClientVueService } from '../../client-vue.service';
import { AjoutDepotGarantieComponent } from './ajout-depot-garantie/ajout-depot-garantie.component';
import {HttpErrorResponse} from "@angular/common/http";
import {DetailGarantieComponent} from "./detail-garantie/detail-garantie.component";


@Component({
  selector: 'credit-depot-garantie',
  templateUrl: './depot-garantie.component.html',
})
export class DepotGarantieComponent {
 depotsGarantiesDataSources: MatTableDataSource<any> = new MatTableDataSource();
 depotsGarantiesData;
  @Input() credit;

  @Output() updateItem = new EventEmitter<any>();

    @Input()
    set depotsGarantiesDataSource(data: any) {
        this.depotsGarantiesData = data || [];
        this.depotsGarantiesDataSources.data=this.depotsGarantiesData;
    }
  depotsGarantiesColumns: string[] = ['libelle','montantTotalGarantie','statut','action'];
  dialogRef: any;
  listTypeGaranties: any;
  offset: number = 0;
  pageSize: number = 10;
  constantes = CONSTANTES;
  isLoading: boolean = false;
  constructor(private _matDialog: MatDialog,
              private clientService: ClientVueService,
              private _changeDetectorRef: ChangeDetectorRef,
              private coreService: CoreService,
              private snackbar: SnackBarService
              ) {

  }

  trackByFn(index: number, item: any): any {
        return item.id || index;
  }
    addDepotGarantie(): void {
        this.dialogRef = this._matDialog.open(AjoutDepotGarantieComponent, {
            autoFocus: true,
            width: '43rem',
            panelClass: 'event-form-dialog',
            disableClose: true,
            data: {
                action: this.constantes.TYPEACTION.NEW,
                credit: this.credit
            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.updateItem.emit(resp);
            }
        });

    }
    detailsDepotGarantie(depot): void {
        this.dialogRef = this._matDialog.open(DetailGarantieComponent, {
            autoFocus: true,
            width: '49rem',
            panelClass: 'event-form-dialog',
            disableClose: true,
            data: {
                garantie: depot
            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.updateItem.emit(resp);
            }
        });

    }

    validerGarantie(depot) {
    this.snackbar.showConfirmation('Voulez-vous vraiment valider cette garantie ?').then((result) => {
            if (result['value'] == true) {
                this.isLoading = true;
                this.coreService.getElement(depot?.id, 'garantie-credit/validerGarantie').subscribe(
                    (resp) => {
                        if (resp[this.constantes.RESPONSE_CODE] == this.constantes.HTTP_STATUS.SUCCESSFUL) {
                            this.isLoading = false;
                            this.snackbar.openSnackBar('Garantie validée avec succés', 'OK',['mycssSnackbarGreen']);
                            this.updateItem.emit(resp);
                        } else {
                            this.isLoading = false;
                            this.snackbar.openSnackBar(resp['cause']['message'], 'OK',['mycssSnackbarRed']);
                        }
                    },
                    (error) => {
                        this.isLoading = false;
                        this.snackbar.showErrors(error);
                    });
            }
        });

    }

    rejeterDepotGarantie(depot) {
        this.snackbar.showConfirmation('Voulez-vous vraiment rejeter cette garantie ?').then((result) => {
            if (result['value'] == true) {
                this.isLoading = true;
                this.coreService.getElement(depot?.id,'garantie-credit/annulerGarantie').subscribe(
                    (resp) => {
                        if (resp[this.constantes.RESPONSE_CODE] == this.constantes.HTTP_STATUS.SUCCESSFUL) {
                            this.isLoading = false;
                            this.snackbar.openSnackBar('Garantie rejeter avec succés', 'OK',['mycssSnackbarGreen']);
                            this.updateItem.emit(resp);
                        } else {
                            this.isLoading = false;
                            this.snackbar.openSnackBar(resp['cause']['message'], 'OK',['mycssSnackbarRed']);
                        }
                    },
                    (error) => {
                        this.isLoading = false;
                        this.snackbar.showErrors(error);
                    });
            }
        });

    }
    cloturerDepotGarantie(depot) {
        this.snackbar.showConfirmation('Voulez-vous vraiment cloturer cette garantie ?').then((result) => {
            if (result['value'] == true) {
                this.isLoading = true;
                this.coreService.cloture(depot?.id,'garantie-credit/cloturerGarantie/').subscribe(
                    (resp) => {
                        if (resp[this.constantes.RESPONSE_CODE] == this.constantes.HTTP_STATUS.SUCCESSFUL) {
                            this.isLoading = false;
                            this.snackbar.openSnackBar('Garantie cloturée avec succés', 'OK',['mycssSnackbarGreen']);
                            this.updateItem.emit(resp);
                        } else {
                            this.isLoading = false;
                            this.snackbar.openSnackBar(resp['message'], 'OK',['mycssSnackbarRed']);
                        }
                    },
                    (error:HttpErrorResponse) => {
                        this.isLoading = false;
                        this.snackbar.showErrors(error);
                    });
            }
        });

    }

    getListTypeGarantie(): void{
        // @ts-ignore
        for (const depot of this.depotsGarantiesDataSource){
            this.clientService.getElementById(depot?.typeGarantie?.id,'type-garantie').subscribe((resp) => {
                if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                    depot['libelle'] = resp[this.constantes.RESPONSE_DATA]?.libelle;
                    this._changeDetectorRef.markForCheck();
                } else {

                }
            });
        }
    }
}
