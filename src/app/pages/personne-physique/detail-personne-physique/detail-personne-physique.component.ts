import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
//import {CoreService} from "app/core/core/core.service";
//import {CONSTANTES} from "../../model/constantes";
//import {SnackBarService} from "../../../../../core/auth/snackBar.service";

import { CONSTANTES } from 'src/app/shared/models/constantes';
import { CoreService } from 'src/app/shared/core/core.service';
import { SnackBarService } from 'src/app/shared/core/snackBar.service';
import { AngularMaterialModule } from 'src/app/shared/angular-materiel-module/angular-materiel-module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-details-personne-physique',
    templateUrl: './detail-personne-physique.component.html',
    styleUrls: ['./detail-personne-physique.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone:true,
    imports:[AngularMaterialModule,ReactiveFormsModule,CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPersonnePhysiqueComponent {
    panelOpenState = false;
    dialogTitle: string;
    currentItem: any;
    attributComplementaires: any = [];
    constantes = CONSTANTES;
    dialogRef: any;

    constructor(public matDialogRef: MatDialogRef<DetailPersonnePhysiqueComponent>,
                @Inject(MAT_DIALOG_DATA) _data,
                private coreService: CoreService,
                private _changeDetectorRef: ChangeDetectorRef,
                private snackbar: SnackBarService,
                private _matDialog: MatDialog,
    ) {
        this.dialogTitle = 'Détails de la personne physique';
        this.currentItem = _data.item;
      //  this.getAttributComplementaireClient( this.currentItem.id);
    }

    getAttributComplementaireClient(idPersonnePhysique) {
        const data = {
            'natureAttribut': 'PERSONNE_PHYSIQUE',
            'referenceObjet': idPersonnePhysique
        };
        this.coreService.getAttributComplementaire(data, 'attribut-complementaire/mine').subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.attributComplementaires = resp[this.constantes.RESPONSE_DATA];

                this._changeDetectorRef.markForCheck();
            }
        }, (error) => {
            this.snackbar.showErrors(error);
        });
    }
    ajoutAttributComplementaire(): void {
        // this.dialogRef = this._matDialog.open(AjoutAttributComplementaireComponent, {
        //     autoFocus: true,
        //     width: '30rem',
        //     panelClass: 'event-form-dialog',
        //     data: {
        //         action: 'new',
        //         client:  this.currentItem,
        //         listAttribut: this.attributComplementaires,
        //         type: 'PERSONNE_PHYSIQUE',
        //         check: true
        //     }
        // });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.getAttributComplementaireClient(this.currentItem.id);
            }
        });
    }
    updateAttributComplementaire(attribut): void {
        // this.dialogRef = this._matDialog.open(AjoutAttributComplementaireComponent, {
        //     autoFocus: true,
        //     width: '30rem',
        //     panelClass: 'event-form-dialog',
        //     data: {
        //         action: 'edit',
        //         client: this.currentItem,
        //         attribut: attribut,
        //         type: 'PERSONNE_PHYSIQUE',
        //         check: true
        //     }
        // });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.getAttributComplementaireClient(this.currentItem.id);
            }
        });
    }
}
