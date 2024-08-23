import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'app/core/auth/snackBar.service';
import { CoreService } from 'app/core/core/core.service';
import { CONSTANTES } from '../../../admin/model/constantes';

@Component({
    selector: 'app-financement-credit',
    templateUrl: './financement-credit.component.html',
    styleUrls: ['./financement-credit.component.scss']
})
export class FinancementCreditComponent implements OnInit {
    id: string;
    financementForm: UntypedFormGroup;
    labelButton: string;
    dialogTitle: string = 'Financement Crédit';
    dialogRef: any;
    loader: boolean = false;
    action: string;
    offset: number = 0;
    pageSize: number = 10;
    constantes = CONSTANTES;
    clientInfo: any;
    listProgrammeCredit: any;
    today = new Date();
    typeFinancementList = [{name:'VIREMENT',value:'VIREMENT'}];
    currentCredit: any;

    constructor(
        public matDialogRef: MatDialogRef<FinancementCreditComponent>,
        @Inject(MAT_DIALOG_DATA) _data,
        private fb: UntypedFormBuilder,
        private coreService: CoreService,
        private snackbar: SnackBarService
                ) {
        if (_data.action == 'new'){
            this.labelButton = 'Ajouter ';
            this.financementForm = this.initForm();
         }
        this.action = _data?.action;
        this.id = _data.id;
        this.currentCredit = _data.credit;

    }

    ngOnInit(): void {
        this.initForm();

    }

    initForm(): UntypedFormGroup {
        return this.fb.group({
            typeFinanement: ['', [Validators.required]],
            dateMiseEnPlace: [new Date(), [Validators.required]],
        });
    }


    checkValidity(g: UntypedFormGroup) {
        Object.keys(g.controls).forEach((key) => {
            g.get(key).markAsDirty();
        });
        Object.keys(g.controls).forEach((key) => {
            g.get(key).markAsTouched();
        });
        Object.keys(g.controls).forEach((key) => {
            g.get(key).updateValueAndValidity();
        });
    }

    addItems() {
    this.snackbar.showConfirmation('Voulez-vous vraiment financer ce crédit ?').then((result) => {
            if (result['value'] == true) {
                this.loader = true;
                const value = this.financementForm.value;
                value['client'] = this.clientInfo?.id;
                this.coreService.addItem(value, 'credit').subscribe(
                    (resp) => {
                        if (resp) {
                            this.loader = false;
                            this.matDialogRef.close(resp);
                            this.snackbar.openSnackBar('Financement effectué avec succés', 'OK',['mycssSnackbarGreen']);
                        } else {
                            this.loader = false;
                            this.snackbar.openSnackBar(resp['cause']['message'], 'OK',['mycssSnackbarRed']);
                        }
                    },
                    (error) => {
                        this.loader = false;

                    });
            }
        });

    }

    checkRecap(type) {
        if (this.financementForm.invalid) {
            this.checkValidity(this.financementForm);
        } else {
            if (type == 'new') {
                this.addItems();
            }
        }
    }

}
