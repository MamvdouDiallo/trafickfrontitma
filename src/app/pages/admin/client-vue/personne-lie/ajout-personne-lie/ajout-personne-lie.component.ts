import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackBarService} from 'app/core/auth/snackBar.service';
import {CoreService} from 'app/core/core/core.service';
import {CONSTANTES} from '../../../admin/model/constantes';
import {ClientVueService} from '../../client-vue.service';


@Component({
    selector: 'ajout-personne-lie',
    templateUrl: './ajout-personne-lie.component.html',
    styleUrls: ['./ajout-personne-lie.component.scss']
})
export class AjoutPersonneLieComponent implements OnInit {
    personneForm: UntypedFormGroup;
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
        public matDialogRef: MatDialogRef<AjoutPersonneLieComponent>, @Inject(MAT_DIALOG_DATA) _data,
        private snackbar: SnackBarService,
        private clientServive: ClientVueService,
        private CoreService: CoreService
    ) {
        // Set the defaults
        this.action = _data.action;
        this.clientId = _data?.clientId;
        if (this.action === this.constantes.TYPEACTION.EDIT) {
            this.dialogTitle = 'Modifier une personne liée';
            this.signataire = _data.signataire;
            this.personneForm = this.fillForm(this.signataire);
        } else if (this.action === this.constantes.TYPEACTION.NEW) {
            this.dialogTitle = 'Ajouter une personne liée';
            this.personneForm = this.initForm();
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
            liaison: ['', [Validators.required]],

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
        if (this.personneForm.invalid) {
            this.checkValidity(this.personneForm);
        } else {
            if (type == 'new') {
                this.ajoutPersonne();
            } else if (type == 'edit') {
                this.modifierPersonne();
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

    ajoutPersonne(): void {
        this.snackbar.showConfirmation('Voulez-vous vraiment ajouter cette personne ?').then((result) => {
            if (result['value'] == true) {
                if (this.personneForm.invalid) {
                    return;
                }
                this.isLoading = true;
                this.personneForm.disable();
                const data = {
                    'liaison': this.personneForm.value.liaison,
                    'personnePhysique': this.infosPersonne?.id,
                    'client': this.clientId
                };
                this.clientServive.ajouter('personne-lie', data)
                    .subscribe(
                        (response) => {
                            if (response) {
                                this.isLoading = false;
                                this.matDialogRef.close(true);
                                this.snackbar.openSnackBar('Personne ajoutée avec succés', 'OK', ['mycssSnackbarGreen']);
                            } else {
                                this.snackbar.openSnackBar(response['message'], 'OK', ['mycssSnackbarRed']);
                            }
                        },
                        (error) => {
                            this.isLoading = false;
                            this.personneForm.enable();
                            this.snackbar.showErrors(error);
                        }
                    );
            }
        });
    }

    modifierPersonne(): void {
        this.snackbar.showConfirmation('Voulez-vous vraiment modifier ce signataire ?').then((result) => {
            if (result['value'] == true) {
                this.isLoading = true;
                if (this.personneForm.invalid) {
                    return;
                }
                this.personneForm.disable();
                this.clientServive.modifierSignataire(this.personneForm.value)
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
                            this.personneForm.enable();
                            this.snackbar.showErrors(error);
                        }
                    );
            }
        });
    }

    getListNaturePieces() {
        this.CoreService.list('nature-piece', 0, 10)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.naturePieces = response['data'];
                }
            });
    }

    getListSignataire() {
        this.CoreService.list('signataire', 0, 10)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.signataireList = response['data'];
                }
            });
    }

    getInfosPersonne() {
        const naturePiece = this.personneForm.get('naturePiece').value;
        const numeroPiece = this.personneForm.get('numeroPiece').value;
        this.clientServive.getInfos(naturePiece, numeroPiece)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.infosPersonne = response['data'];
                    this.showField = true;
                    this.personneForm.get('prenom').setValue(this.infosPersonne?.prenom);
                    this.personneForm.get('nom').setValue(this.infosPersonne?.nom);
                    this.personneForm.get('telephone').setValue(this.infosPersonne?.phoneNumber);
                    this.personneForm.get('email').setValue(this.infosPersonne?.email);
                }
            });
    }

}
