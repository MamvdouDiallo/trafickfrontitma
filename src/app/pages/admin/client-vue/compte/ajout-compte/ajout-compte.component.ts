import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackBarService} from 'app/core/auth/snackBar.service';
import {CoreService} from 'app/core/core/core.service';
import {CONSTANTES} from '../../../admin/model/constantes';

@Component({
    selector: 'app-ajout-compte',
    templateUrl: './ajout-compte.component.html',
    styleUrls: ['./ajout-compte.component.scss']
})
export class AjoutCompteComponent implements OnInit {
    dialogTitle: string;
    id: string;
    initForm: UntypedFormGroup;
    labelButton: string;
    suffixe: string = 'un compte';
    dialogRef: any;
    loader: boolean = false;
    action: string;
    typeComptes: any;
    devises: any;
    compteGeneral: any;
    signataires: any;
    agenceId;
    offset: number = 0;
    pageSize: number = 10;
    constantes = CONSTANTES;
    currentClient: any;

    constructor(public matDialogRef: MatDialogRef<AjoutCompteComponent>,
                @Inject(MAT_DIALOG_DATA) _data,
                private fb: UntypedFormBuilder,
                private coreService: CoreService,
                private changeDetectorRefs: ChangeDetectorRef,
                private snackbar: SnackBarService
    ) {
        if (_data.action == 'new') {
            this.labelButton = 'Ajouter ';
        } else {
            this.labelButton = 'Modifier ';
        }
        this.action = _data?.action;
        this.id = _data.id;
        this.dialogTitle = this.labelButton + this.suffixe;
        this.getListDevise();
        this.getListTypeCompte();
        this.getListCompteGeneral();
        this.currentClient = this.coreService.decriptDataToLocalStorage('CD-@--119');
        this.agenceId = this.coreService.decriptDataToLocalStorage('CD-@2');

    }

    ngOnInit(): void {
        this.initForm = this.fb.group({
            nom: this.fb.control('', [Validators.required]),
            typeCompte: this.fb.control('', [Validators.required]),
            agence: this.fb.control(this.agenceId?.id, [Validators.required]),
            devise: this.fb.control('', [Validators.required])
        });

    }

    getListDevise() {
        this.coreService.list('devise', this.offset, this.pageSize)
            .subscribe((response) => {
                if (response['responseCode'] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                    this.devises = response['data'];
                    this.changeDetectorRefs.markForCheck();
                }
            });
    }

    getListCompteGeneral() {
        this.coreService.list('compte-general', this.offset, this.pageSize)
            .subscribe((response) => {
                if (response['responseCode'] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                    this.compteGeneral = response['data'];
                    this.changeDetectorRefs.markForCheck();
                }
            });
    }

    getListTypeCompte() {
        this.coreService.listv2('type-compte?categorieCompte=' + this.constantes.CATEGORIE_COMPTE.EPARGNE_CODE, 0, 100)
            .subscribe((response) => {
                if (response['responseCode'] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                    this.typeComptes = response['data'];
                    this.changeDetectorRefs.markForCheck();
                }
            });
    }

    checkTypeCompte() {
        const val = this.initForm.get('typeCompte').value;
        const compteType = this.typeComptes.filter(type => type.id == val);
        const nomCompte = compteType[0].libelle + ' - ' + this.currentClient?.intitule;
        this.initForm.get('nom').setValue(nomCompte);
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
        this.snackbar.showConfirmation('Voulez-vous vraiment ajouter ce compte ?').then((result) => {
            if (result['value'] == true) {
                this.loader = true;
                const value = this.initForm.value;
                value['client'] = this.currentClient?.id;
                this.coreService.addItem(value, 'creer-compte-client').subscribe(
                    (resp) => {
                        if (resp) {
                            this.loader = false;
                            this.matDialogRef.close(resp);
                            this.snackbar.openSnackBar('Compte ajouté avec succés', 'OK', ['mycssSnackbarGreen']);
                        } else {
                            this.loader = false;
                            this.snackbar.openSnackBar(resp['cause']['message'], 'OK', ['mycssSnackbarRed']);
                        }
                    },
                    (error) => {
                        this.loader = false;
                        this.loader = false;
                        this.snackbar.showErrors(error);
                    });
            }
        });

    }

    updateItems() {
        this.snackbar.showConfirmation('Voulez-vous vraiment modifier cet actionnaire ?').then((result) => {
            if (result['value'] == true) {
                this.loader = true;
                const value = this.initForm.value;

                this.coreService.updateItem(value, this.id, 'actionnaire').subscribe(
                    (resp) => {
                        if (resp) {
                            this.loader = false;
                            this.matDialogRef.close(resp);
                            this.snackbar.openSnackBar('Actionnaire modifié avec succés', 'OK', ['mycssSnackbarGreen']);
                        } else {
                            this.loader = false;
                            this.snackbar.openSnackBar(resp['message'], 'OK', ['mycssSnackbarRed']);
                        }
                    },
                    (error) => {
                        this.loader = false;
                        this.loader = false;
                        this.snackbar.showErrors(error);
                    });
            }
        });

    }

    checkRecap(type) {
        if (this.initForm.invalid) {
            this.checkValidity(this.initForm);
        } else {
            if (type == 'new') {
                this.addItems();
            } else if (type == 'edit') {
                this.updateItems();
            }
        }
    }

    protected readonly open = open;
}
