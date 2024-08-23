import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackBarService} from 'app/core/auth/snackBar.service';
import {CoreService} from 'app/core/core/core.service';
import {CONSTANTES} from '../../../admin/model/constantes';
import {ClientVueService} from '../../client-vue.service';
import {HttpErrorResponse} from "@angular/common/http";


@Component({
    selector: 'ajout-actionnaire-client',
    templateUrl: './ajout-actionnaire-client.component.html',
    styleUrls: ['./ajout-actionnaire-client.component.scss']
})
export class AjoutActionnaireClientComponent implements OnInit {
    actionnaireForm: UntypedFormGroup;
    isLoading: boolean = false;
    action: string;
    dialogTitle: string;
    signataire: any;
    constantes = CONSTANTES;
    naturePieces: any;
    infosPersonne: any;
    showField = false;
    signataireList = [];
    clientId: any;

    constructor(
        private formBuilder: UntypedFormBuilder,
        public matDialogRef: MatDialogRef<AjoutActionnaireClientComponent>, @Inject(MAT_DIALOG_DATA) _data,
        private snackbar: SnackBarService,
        private clientService: ClientVueService,
        private coreService: CoreService
    ) {
        // Set the defaults
        this.action = _data.action;
        this.clientId = _data?.dataOther;
        if (this.action === this.constantes.TYPEACTION.EDIT) {
            this.dialogTitle = 'Modifier un actionnaire';
            this.signataire = _data.dataValue;
            this.actionnaireForm = this.fillForm(this.signataire);
        } else if (this.action === this.constantes.TYPEACTION.NEW) {
            this.dialogTitle = 'Ajouter un actionnaire';
            this.actionnaireForm = this.initForm();
        }
    }

    ngOnInit(): void {
        this.initForm();
        this.getListNaturePieces();
        this.getListSignataire();
    }

    initForm(): UntypedFormGroup {
        return this.formBuilder.group({
            naturePiece: ['', [Validators.required]],
            numeroPiece: ['', [Validators.required]],
            prenom: ['', [Validators.required]],
            nom: ['', [Validators.required]],
            telephone: ['', [Validators.required]],
            email: ['', [Validators.required]],
            fonction: ['', [Validators.required]],
            nombreAction: ['', [Validators.required]],
            // signataire: ['', [Validators.required]]

        });
    }

    fillForm(signataire): UntypedFormGroup {
        return this.formBuilder.group({
            id: signataire['id'],
            naturePiece: [signataire.naturePiece, Validators.required],
            numeroPiece: [signataire.numeroPiece, Validators.required]
        });
    }

    //cette fonction permet de verifier si le formulaire est valid ou pas
    checkRecap(type) {
        if (this.actionnaireForm.invalid) {
            this.checkValidity(this.actionnaireForm);
        } else {
            if (type == 'new') {
                this.ajoutSignataire();
            } else if (type == 'edit') {
                this.modifierSignataire();
            }
        }
    }

    //cette fonction permet de verifier les champs obligatoires
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

    ajoutSignataire(): void {
        this.snackbar.showConfirmation('Voulez-vous vraiment ajouter cet actionnaire ?').then((result) => {
            if (result['value'] == true) {
                if (this.actionnaireForm.invalid) {
                    return;
                }
                this.isLoading = true;
                this.actionnaireForm.disable();
                const nombreAction = this.actionnaireForm.get('nombreAction').value;
                const data = {
                    'fonction': this.actionnaireForm.value.fonction,
                    'nombreAction': parseInt(nombreAction),
                    'personnePhysique': this.infosPersonne?.id,
                    'client': this.clientId
                };
                this.clientService.ajouter('actionnaire', data)
                    .subscribe(
                        (response) => {
                            if (response) {
                                this.isLoading = false;
                                this.matDialogRef.close(true);
                                this.snackbar.openSnackBar('Actionnaire ajouté avec succés', 'OK', ['mycssSnackbarGreen']);
                            } else {
                                this.snackbar.openSnackBar(response['message'], 'OK', ['mycssSnackbarRed']);
                            }
                        },
                        (error) => {
                            this.isLoading = false;
                            this.actionnaireForm.enable();
                            this.snackbar.showErrors(error);
                        }
                    );
            }
        });
    }

    modifierSignataire(): void {
        this.snackbar.showConfirmation('Voulez-vous vraiment modifier ce signataire ?')
            .then((result) => {
                if (result['value'] == true) {
                    this.isLoading = true;
                    if (this.actionnaireForm.invalid) {
                        return;
                    }
                    this.actionnaireForm.disable();
                    this.clientService.modifierSignataire(this.actionnaireForm.value)
                        .subscribe(
                            (response) => {
                                if (response[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                                    this.isLoading = false;
                                    this.matDialogRef.close(true);
                                    this.snackbar.openSnackBar('Signataire modifié avec succés', 'OK', ['mycssSnackbarGreen']);
                                }

                            },
                            (error) => {
                                this.isLoading = false;
                                this.actionnaireForm.enable();
                                this.snackbar.showErrors(error);
                            }
                        );
                }
            });
    }

    getListNaturePieces() {
        this.coreService.list('nature-piece', 0, 10)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.naturePieces = response['data'];
                }
            });
    }

    getListSignataire() {
        this.coreService.list('signataire', 0, 10)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.signataireList = response['data'];
                }
            });
    }

    getInfosPersonne() {
        const naturePiece = this.actionnaireForm.get('naturePiece').value;
        const numeroPiece = this.actionnaireForm.get('numeroPiece').value;
        this.clientService.getInfos(naturePiece, numeroPiece)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.infosPersonne = response['data'];
                    this.showField = true;
                    this.actionnaireForm.get('prenom').setValue(this.infosPersonne?.prenom);
                    this.actionnaireForm.get('nom').setValue(this.infosPersonne?.nom);
                    this.actionnaireForm.get('telephone').setValue(this.infosPersonne?.phoneNumber);
                    this.actionnaireForm.get('email').setValue(this.infosPersonne?.email);
                }
            }, (error: HttpErrorResponse) => {
                this.showField = false;
                this.snackbar.openSnackBar("Aucune personne trouvée avec la combinaison nature de piece et numero", 'OK', ['mycssSnackbarRed']);
            });
    }

}
