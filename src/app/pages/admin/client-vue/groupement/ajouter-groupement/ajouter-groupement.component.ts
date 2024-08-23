import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SnackBarService} from 'app/core/auth/snackBar.service';
import {CoreService} from 'app/core/core/core.service';
import {CONSTANTES} from '../../../admin/model/constantes';
import {AjoutPersonnePhysiqueComponent} from '../../../admin/personne-physique/ajout/ajout.component';
import {ClientVueService} from '../../client-vue.service';


@Component({
    selector: 'ajouter-groupement',
    templateUrl: './ajouter-groupement.component.html',
    styleUrls: ['./ajouter-groupement.component.scss']
})
export class AjouterGroupementComponent implements OnInit {
    signataireForm: UntypedFormGroup;
    isLoading: boolean = false;
    action: string;
    dialogTitle: string;
    signataire: any;
    constantes = CONSTANTES;
    naturePieceType = [{name: 'Name1', value: 'Name1'}, {name: 'Name2', value: 'Name2'}];
    naturePieces: any;
    infosPersonne: any;
    showField = false;
    fonctionMembreList = [];
    clientId: any;
    loader: boolean = false;
    dialogRef: any;


    constructor(
        private formBuilder: UntypedFormBuilder,
        public matDialogRef: MatDialogRef<AjouterGroupementComponent>, @Inject(MAT_DIALOG_DATA) _data,
        private snackbar: SnackBarService,
        private clientServive: ClientVueService,
        private coreService: CoreService,
        private _matDialog: MatDialog,
        private changeDetectorRefs: ChangeDetectorRef
    ) {


        // Set the defaults
        this.action = _data.action;
        this.clientId = _data?.clientId;
        if (this.action === this.constantes.TYPEACTION.EDIT) {
            this.dialogTitle = 'Modifier un membre du groupement';
            this.signataire = _data.signataire;
            this.signataireForm = this.fillForm(this.signataire);
        } else if (this.action === this.constantes.TYPEACTION.NEW) {
            this.dialogTitle = 'Ajouter un membre du groupement';
            this.signataireForm = this.initForm();
        }
    }

    ngOnInit(): void {
        this.initForm();
        this.getListNaturePieces();
        this.getListMembre();
    }

    initForm(): UntypedFormGroup {
        return this.formBuilder.group({
            naturePiece: ['', [Validators.required]],
            numeroPiece: ['', [Validators.required]],
            prenom: ['', [Validators.required]],
            nom: ['', [Validators.required]],
            telephone: ['', [Validators.required]],
            email: [''],
            fonctionMembre: ['', [Validators.required]]
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
        if (this.signataireForm.invalid) {
            this.checkValidity(this.signataireForm);
        } else {
            if (type == 'new') {
                this.ajoutMembreGroupement();
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

    ajoutMembreGroupement(): void {
        this.snackbar.showConfirmation('Voulez-vous vraiment ajouter ce membre au groupement ?').then((result) => {
            if (result['value'] == true) {
                if (this.signataireForm.invalid) {
                    return;
                }
                this.isLoading = true;
                this.signataireForm.disable();

                const data = {
                    'fonctionMembre': this.signataireForm.value.fonctionMembre,
                    'personnePhysique': this.infosPersonne?.id,
                    'client': this.clientId
                };
                this.clientServive.ajouter('membre-groupement', data)
                    .subscribe(
                        (response) => {
                            if (response) {
                                this.isLoading = false;
                                this.matDialogRef.close(true);
                                this.snackbar.openSnackBar('Membre ajouté avec succés', 'OK', ['mycssSnackbarGreen']);
                            } else {
                                this.snackbar.openSnackBar(response['message'], 'OK', ['mycssSnackbarRed']);
                            }
                        },
                        (error) => {
                            this.isLoading = false;
                            this.signataireForm.enable();
                            this.snackbar.showErrors(error);
                        }
                    );
            }
        });
    }

    modifierSignataire(): void {
        this.snackbar.showConfirmation('Voulez-vous vraiment modifier ce signataire ?').then((result) => {
            if (result['value'] == true) {
                this.isLoading = true;
                if (this.signataireForm.invalid) {
                    return;
                }
                this.signataireForm.disable();
                this.clientServive.modifierSignataire(this.signataireForm.value)
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
                            this.signataireForm.enable();
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

    getListMembre() {
        this.coreService.list('fonction-membre', 0, 10)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.fonctionMembreList = response['data'];

                }
            });
    }

    getInfosPersonne() {
        const naturePiece = this.signataireForm.get('naturePiece').value;
        const numeroPiece = this.signataireForm.get('numeroPiece').value;
        this.loader = true;
        this.clientServive.getInfos(naturePiece, numeroPiece)
            .subscribe((response) => {
                if (response['responseCode'] === 200 && response['data'].length != 0) {
                    this.infosPersonne = response['data'];
                    this.showField = true;
                    this.loader = false;
                    this.signataireForm.get('prenom').setValue(this.infosPersonne?.prenom);
                    this.signataireForm.get('nom').setValue(this.infosPersonne?.nom);
                    this.signataireForm.get('telephone').setValue(this.infosPersonne?.phoneNumber);
                    this.signataireForm.get('email').setValue(this.infosPersonne?.email);
                }
            }, (error) => {
                this.loader = false;
                this.openModalPersonnePhysique();
            });
    }


    openModalPersonnePhysique() {
        this.dialogRef = this._matDialog.open(AjoutPersonnePhysiqueComponent, {
            panelClass: 'event-form-dialog',
            disableClose: true,
            width: '50rem',
            height: 'auto',
            data: {
                canAdd: false,

            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.signataireForm.get('naturePiece').setValue(resp?.naturePiece?.id);
                this.signataireForm.get('numeroPiece').setValue(resp?.numeroPiece);
                this.getInfosPersonne();
                this.changeDetectorRefs.detectChanges();
                setTimeout(() => {

                }, 1000);
                setTimeout(() => {

                }, 5000);

            }
        });
    }


}
