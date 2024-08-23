import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import swal, {SweetAlertIcon, SweetAlertResult} from 'sweetalert2';
import {CoreService} from 'app/core/core/core.service';
import {CONSTANTES} from 'app/modules/presentation/admin/model/constantes';
import {SnackBarService} from "app/core/auth/snackBar.service";

@Component({
    selector: 'app-detail-compte',
    templateUrl: './detail-remboursement.component.html',
    styleUrls: ['./detail-remboursement.component.scss']
})
export class DetailRemboursementComponent implements OnInit {
    dialogTitle = 'Remboursement Anticipé';
    constantes = CONSTANTES;
    initForm: UntypedFormGroup;
    loader: boolean;
    datas: any;
    amortissementData: any;
    client: any;
    nbreEcheance: any;
    panelOpenState = false;
    dialogRef: any;
    isLoading: boolean = false;
    isLoader: boolean = false;
    offset: number = 0;
    informations: any;
    pageSize: number = 10;
    paramsId: any;
    comptes: any = [];
    nombreEcheance = [];
    isMontant: boolean = false;
    compteDataSource: MatTableDataSource<any> = new MatTableDataSource();

    constructor(public matDialogRef: MatDialogRef<DetailRemboursementComponent>,
                @Inject(MAT_DIALOG_DATA) _data,
                private snackBar: MatSnackBar,
                private changeDetectorRefs: ChangeDetectorRef,
                private _changeDetectorRef: ChangeDetectorRef,
                private coreService: CoreService,
                private snackartService: SnackBarService,
                private formBuilder: UntypedFormBuilder
    ) {

        this.datas = _data.currentCredit;
        this.amortissementData = _data.length;
    }

    ngOnInit(): void {
        this.initForm = this.formBuilder.group({
            montant: this.formBuilder.control(null,)
        });
        this.getClient(this.datas?.client?.id);
        this.getCompte();
        // if (this.amortissementData ===''){
        const montantData = this.initForm.get('montant');
        montantData.disable({onlySelf: true});
        // }
    }

    getMontant() {
        this.isMontant = false;
        if (this.initForm.get('montant').value < this.datas?.montantEcheance) {
            this.isMontant = true;
            this.openSnackBar('Le montant anticipé doit étre supérieur ou égale au montant échéance', 'OK', 10000, 'mycssSnackbarRed');
        } else if (this.initForm.get('montant').value > this.datas?.montantRestantDu) {
            this.isMontant = true;
            this.openSnackBar('Le montant anticipé ne doit pas étre supérieur au restant du', 'OK', 10000, 'mycssSnackbarRed');
        }

    }

    onSelectionChange() {
        this.isLoader = true;
        let data = {
            'credit': this.datas?.id,
            'nombreEcheance': this.nbreEcheance
        }
        this._changeDetectorRef.markForCheck();
        this.coreService.balanceGeneral('remboursement-anticiper-info', data).subscribe((resp) => {
            if (resp) {
                let montantArembourse = resp['montantArembourse'];
                this.isLoader = false;
                const montantData = this.initForm.get('montant');
                montantData.setValue(montantArembourse);
                montantData.disable({onlySelf: true});
                this._changeDetectorRef.markForCheck();
            }
        }, (error) => {
            this.isLoader = false;
            this._changeDetectorRef.markForCheck();
        });
    }

    generateOptions(): number[] {
        return Array.from({length: this.amortissementData}, (_, index) => index + 1);
    }

    openSnackBar(message: string, action: string, duration: number, classe: string): void {
        this.snackBar.open(message, action, {
            verticalPosition: 'bottom',
            duration: duration,
            panelClass: [classe]
        });
    }

    openSwal(title: string, text: string, icon: SweetAlertIcon, confirmButtonText: string, cancelButtonText: string): Promise<SweetAlertResult<any>> {
        return swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        });
    }

    getCompte() {
        this.coreService.listv2('comptes?clientId=' + this.paramsId, this.offset, this.pageSize,).subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.compteDataSource.data = resp[this.constantes.RESPONSE_DATA];
                this.comptes = resp[this.constantes.RESPONSE_DATA];
                this._changeDetectorRef.markForCheck();
            } else {
            }
        }, () => {
        });

    }

    validerAnticipe() {
        this.openSwal('Confirmation', 'Voulez-vous vraiment valider ce remboursement ?', 'warning', 'Confirmer', 'Annuler')
            .then((result) => {
                if (result['value'] == true) {
                    this.isLoading = true;
                    this.changeDetectorRefs.detectChanges();
                    const message = 'Remboursement validé avec succés';
                    const data = {
                        'credit': this.datas?.id,
                        'nombreEcheance': this.nbreEcheance,
                    };
                    this.coreService.valider(data).subscribe((resp) => {
                            this.isLoading = false;
                            this.changeDetectorRefs.markForCheck();
                            this.openSnackBar(message + ' avec succès', 'OK', 10000, 'mycssSnackbarGreen');
                            this.matDialogRef.close();
                        }
                        , (error) => {
                            this.isLoading = false;
                            this.snackartService.showErrors(error);
                            this.changeDetectorRefs.detectChanges();
                        });

                }
            });
    }

    bloquer(compte) {
        this.openSwal('Confirmation', 'Voulez-vous vraiment bloquer ce compte ?', 'warning', 'Confirmer', 'Annuler')
            .then((result) => {
                if (result['value'] == true) {
                    const message = 'Le compte a été bloqué';
                    this.coreService.bloquerCompte(compte?.id).subscribe((resp) => {
                            this.changeDetectorRefs.markForCheck();
                            this.changeDetectorRefs.detectChanges();
                            this.openSnackBar(message + ' avec succès', 'OK', 10000, 'mycssSnackbarGreen');

                        }
                        , (error) => {
                            this.snackartService.showErrors(error);
                        });
                    this.matDialogRef.close();
                }
            });
    }

    getClient(idClient) {
        this.coreService.getElement(idClient, 'client')
            .subscribe((response) => {
                if (response['responseCode'] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                    this.client = response['data'];
                }
            });
    }
}
