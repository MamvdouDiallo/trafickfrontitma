import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SnackBarService} from 'app/core/auth/snackBar.service';
import {CoreService} from 'app/core/core/core.service';
import {CONSTANTES} from '../../../admin/model/constantes';
import {AjoutPersonnePhysiqueComponent} from '../../../admin/personne-physique/ajout/ajout.component';
import {ClientVueService} from '../../client-vue.service';


@Component({
    selector: 'ajout-signataire',
    templateUrl: './ajout-signataire.component.html',
    styleUrls: ['./ajout-signataire.component.scss']
})
export class AjoutSignataireComponent implements OnInit {
    signataireForm: UntypedFormGroup;
    isLoading: boolean = false;
    action: string;
    dialogTitle: string;
    signataire: any;
    clients: any;
    offset: number = 0;
    pageSize: number = 10;
    agenceId: any;
    constantes = CONSTANTES;

    naturePieces: any;
    infosPersonne: any;

    isLoader: boolean = false;

    showField = false;

    clientId: any;
    loader: boolean = false;
    dialogRef: any;
    periodiciteList = [];


    constructor(
        private formBuilder: UntypedFormBuilder,
        public matDialogRef: MatDialogRef<AjoutSignataireComponent>, @Inject(MAT_DIALOG_DATA) _data,
        private snackbar: SnackBarService,
        private clientServive: ClientVueService,
        private coreService: CoreService,
        private _matDialog: MatDialog,
        public changeDetectorRefs: ChangeDetectorRef
    ) {


        // Set the defaults
        this.action = _data.action;
        this.clientId = this.coreService.decriptDataToLocalStorage('CD-@--119');
        this.agenceId = this.coreService.decriptDataToLocalStorage('CD-@2');
        if (this.action === this.constantes.TYPEACTION.EDIT) {
            this.dialogTitle = 'Modifier un signataire';
            this.signataire = _data.signataire;
            this.signataireForm = this.fillForm(this.signataire);
        } else if (this.action === this.constantes.TYPEACTION.NEW) {
            this.dialogTitle = 'Ajouter un signataire';
            this.signataireForm = this.initForm();
        }
    }

    ngOnInit(): void {
        this.initForm();
        this.getListClient();
        this.getListNaturePieces();
        this.getListPeriodicite();
    }

    initForm(): UntypedFormGroup {
        return this.formBuilder.group({
            naturePiece: ['', []],
            numeroPiece: ['', []],
            client: ['', []],
            montantMaxAutorise: ['', [Validators.required]],
            periodicite: ['', [Validators.required]]
        });
    }

    fillForm(signataire): UntypedFormGroup {
        return this.formBuilder.group({
            id: signataire['id'],
            naturePiece: [signataire.naturePiece, Validators.required],
            numeroPiece: [signataire.numeroPiece, Validators.required]
        });
    }

    getListPeriodicite() {
        this.coreService.list('periodicite', 0, 10)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.periodiciteList = response['data'];
                }
            });
    }

    //cette fonction permet de verifier si le formulaire est valid ou pas
    checkRecap(type) {
        if (this.signataireForm.invalid) {
            this.checkValidity(this.signataireForm);
        } else {
            if (type == 'new') {
                this.ajoutSignataire();
            } else if (type == 'edit') {
                this.modifierSignataire();
            }
        }
    }

    getListClient() {
        this.coreService.list('clients-agence/' + this.agenceId?.id, 0, 100)
            .subscribe(
                (response) => {
                    if (response['responseCode'] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                        this.processClientData(response['data']);
                    }
                },
                (error) => {
                    this.handleError(error);
                }
            );
    }

    processClientData(data: any[]) {
        this.clients = data.filter(client => client.typeClient?.typePersonne === 'PP');

        this.changeDetectorRefs.markForCheck();
    }

    handleError(error: any) {
        // Gérer les erreurs ici (par exemple, afficher un message d'erreur à l'utilisateur).
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
        this.snackbar.showConfirmation('Voulez-vous vraiment ajouter ce signataire ?').then((result) => {
            if (result['value'] == true) {
                if (this.signataireForm.invalid) {
                    return;
                }
                this.isLoading = true;
                this.signataireForm.disable();
                const data = {
                    'montantMaxAutorise': Number(this.signataireForm.value.montantMaxAutorise),
                    'periodiciteMontantMax': this.signataireForm.value.periodicite,
                    'personnePhysique': this.infosPersonne?.id,
                    'client': this.clientId?.id
                };
                this.clientServive.ajouter('signataire', data)
                    .subscribe(
                        (response) => {
                            if (response) {
                                this.isLoading = false;
                                this.matDialogRef.close(true);
                                this.snackbar.openSnackBar('Signataire ajouté avec succés', 'OK', ['mycssSnackbarGreen']);
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
                }
            }, (error) => {
                this.openModalPersonnePhysique();
                this.loader = false;
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
