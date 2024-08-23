import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
    AjoutAttributComplementaireComponent
} from "../../../info-client/ajout-attribut-complementaire/ajout-attribut-complementaire.component";
import {CoreService} from "app/core/core/core.service";
import { CONSTANTES } from 'app/modules/presentation/admin/model/constantes';
@Component({
    selector: 'app-detail-garantie',
    templateUrl: './detail-garantie.component.html',
    styleUrls: ['./detail-garantie.component.scss']
})
export class DetailGarantieComponent implements OnInit {
    dialogTitle = 'Détail de la garantie';
    loader: boolean;
    datas: any;
    client: any;
    panelOpenState = false;
    dialogRef: any;
    isLoading: boolean = false;
    isLoader: boolean = false;
    offset: number = 0;
    informations: any;
    pageSize: number = 10;
    paramsId: any;
    comptes: any = [];
    attributComplementaires: any = [];
    constantes = CONSTANTES;

    constructor(public matDialogRef: MatDialogRef<DetailGarantieComponent>,
                @Inject(MAT_DIALOG_DATA) _data, private snackBar: MatSnackBar,
                private _matDialog: MatDialog,
                private coreService: CoreService,
                private _changeDetectorRef: ChangeDetectorRef,

    ) {
        this.datas = _data.garantie;
    }

    ngOnInit(): void {
        this.getAttributComplementaireClient(this.datas.id);
    }

    getAttributComplementaireClient(idGarantie) {
        this.isLoading = true;
        const data = {
            'natureAttribut': 'GARANTIE',
            'referenceObjet': idGarantie
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
    ajoutAttributComplementaire(): void {
        this.dialogRef = this._matDialog.open(AjoutAttributComplementaireComponent, {
            autoFocus: true,
            width: '30rem',
            panelClass: 'event-form-dialog',
            data: {
                action: 'new',
                client:  this.datas,
                listAttribut: this.attributComplementaires,
                type: 'GARANTIE',
                check: true
            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.getAttributComplementaireClient(this.datas.id);
            }
        });
    }

    updateAttributComplementaire(attribut): void {
        this.dialogRef = this._matDialog.open(AjoutAttributComplementaireComponent, {
            autoFocus: true,
            width: '30rem',
            panelClass: 'event-form-dialog',
            data: {
                action: 'edit',
                client: this.datas,
                attribut: attribut,
                type: 'GARANTIE',
                check: true
            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.getAttributComplementaireClient(this.datas.id);
            }
        });
    }
}
