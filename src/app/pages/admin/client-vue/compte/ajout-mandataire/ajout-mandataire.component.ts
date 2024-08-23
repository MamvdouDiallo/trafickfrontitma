import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatStepper} from '@angular/material/stepper';
import {SnackBarService} from 'app/core/auth/snackBar.service';
import {CoreService} from 'app/core/core/core.service';
import {CONSTANTES} from 'app/modules/presentation/admin/model/constantes';
import {AjoutPersonnePhysiqueComponent} from 'app/modules/presentation/admin/personne-physique/ajout/ajout.component';


@Component({
    selector: 'app-ajout-mandataire',
    templateUrl: './ajout-mandataire.component.html',
    styleUrls: ['./ajout-mandataire.component.scss']
})
export class AjoutMandataireComponent implements OnInit {
    panelOpenState = false;
    @ViewChild('stepper') private myStepper: MatStepper;
    dialogTitle: string;
    id: string;
    initForm: UntypedFormGroup;
    labelButton: string;
    suffixe: string = ' un mandataire';
    dialogRef: any;
    statutJuridiques: any = [];
    searchClients: any = [];
    countries: any = [];
    loader: boolean;
    action: string;
    naturePieces: any = [];
    categories: any = [];
    sousActivites: any = [];
    employeurs: any = [];
    agences: any = [];
    typeClient: string = 'particulier';
    natureClient: string = 'particulier';
    typePersonne: string;
    personnePhysiqueID;
    client: any;
    isSearch: boolean = false;
    isSearchClient: boolean = false;
    constantes = CONSTANTES;
    agence;
    hasPhoneError: boolean;
    currentValue: any;
    countryChange: boolean = false;
    eventNumber: any;
    isFocus: unknown;
    errorCNI;
    url;
    compte;
    dateComptable;

    constructor(public matDialogRef: MatDialogRef<AjoutMandataireComponent>,
                @Inject(MAT_DIALOG_DATA) _data,
                private fb: UntypedFormBuilder,
                private coreService: CoreService,
                private changeDetectorRefs: ChangeDetectorRef,
                private snackartService: SnackBarService,
                private snackbar: SnackBarService,
                private _matDialog: MatDialog
    ) {
        this.action = _data.action;
        this.compte = _data.data;
        if (_data.action == this.constantes.TYPEACTION.NEW) {
            this.initForms();
            this.labelButton = this.constantes.TYPE.AJOUTER;
        } else if (_data.action == this.constantes.TYPEACTION.EDIT) {
            this.labelButton = this.constantes.TYPE.MODIFIE;
            this.client = _data?.data;
            this.natureClient = 'particulier';
            this.initForms(this.client);
            this.searchClient();
        }
        this.action = _data?.action;
        this.id = _data.data?.id;
        this.dialogTitle = this.labelButton + this.suffixe;
    }

    ngOnInit(): void {
        this.agence = this.coreService.decriptDataToLocalStorage('CD-@2');
        this.dateComptable = this.coreService.decriptDataToLocalStorage('DC-@--1');
        this.getListPays();
        this.getListNaturePieces();
    }

    initForms(mandataire?) {
        this.initForm = this.fb.group({
            prenom: this.fb.control(mandataire ? mandataire?.prenom : null, [Validators.required]),
            nom: this.fb.control(mandataire ? mandataire?.nom : null, [Validators.required]),
            typeClient: this.fb.control(mandataire ? mandataire?.typeClient?.id : null, []),
            dateNaissance: this.fb.control(mandataire ? mandataire?.dateNaissance : null, []),
            duree: this.fb.control(mandataire ? mandataire?.duree : null, [Validators.required]),
            lieuNaissance: this.fb.control(mandataire ? mandataire?.lieuNaissance : null, []),
            naturePiece: this.fb.control(mandataire ? mandataire?.personnePhysique?.naturePiece?.id : null, [Validators.required]),
            numeroPiece: this.fb.control(mandataire ? mandataire?.personnePhysique?.numeroPiece : null, [Validators.required]),
            email: this.fb.control(mandataire ? mandataire?.email : null),
            phoneNumber: this.fb.control(mandataire ? mandataire?.phoneNumber : null, [Validators.required]),
        });
    }


    checkCNI(field?) {

        this.errorCNI = '';
        const fieldCNI = 'numeroPiece';
        if (field) {
        }

        if (this.initForm.get(fieldCNI).value && this.initForm.get('naturePiece').value) {
            const cni = this.initForm.get(fieldCNI).value.toString();
            const taille = cni.length;
            const type = this.initForm.get('naturePiece').value;
            const nombreCaractereMin = this.naturePieces.find(piece => piece?.id == type)?.nombreCaractereMin;
            const nombreCaractereMax = this.naturePieces.find(piece => piece?.id == type)?.nombreCaractereMax;
            if (taille < nombreCaractereMin || taille > nombreCaractereMax) {
                this.errorCNI = `Le numéro de pièce doit contenir ${nombreCaractereMin} ou ${nombreCaractereMax} caractères`;
            }
        }
    }

    refresh(): void {
        this.initForm.get('numeroPiece').setValue(null);
    }

    searchClient() {
        this.isSearch = true;
        this.changeDetectorRefs.markForCheck();
        if (this.initForm.get('naturePiece').value && this.initForm.get('numeroPiece').value) {

            const data = {
                'nature': this.initForm.get('naturePiece').value,
                'numeroPiece': this.initForm.get('numeroPiece').value
            };
            this.coreService.searchClientByNature(data, 'personne-physique/piece')
                .subscribe((response) => {
                    if (response['responseCode'] === 200) {
                        this.isSearch = false;

                        this.changeDetectorRefs.markForCheck();
                        this.searchClients = response['data'];
                        this.changeDetectorRefs.markForCheck();
                        if (this.searchClients.length != 0) {
                            this.searchClients['naturePiece'] = this.searchClients['naturePiece']['id'];
                            this.initForm.patchValue(this.searchClients);
                            this.personnePhysiqueID = this.searchClients.id;
                            this.isSearchClient = true;
                        } else if (this.searchClients.length == 0) {
                            this.isSearch = false;
                            this.changeDetectorRefs.markForCheck();
                            this.openModalPersonnePhysique(data);
                        }
                    }
                }, (error) => {
                    this.isSearch = false;
                    this.changeDetectorRefs.markForCheck();
                    this.openModalPersonnePhysique(data);
                });
        }
    }

    openModalPersonnePhysique(donnees?) {
        const selectedValue = this.natureClient;
            this.dialogRef = this._matDialog.open(AjoutPersonnePhysiqueComponent, {
                panelClass: 'event-form-dialog',
                disableClose: true,
                width: '50rem',
                height: 'auto',
                data: {
                    canAdd: false,
                    donnees: donnees
                }
            });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {

                if (selectedValue == 'particulier') {
                    this.initForm.patchValue(resp);
                    this.initForm.get('naturePiece').setValue(resp['naturePiece']['id']);
                } else {
                    this.initForm.patchValue(resp['data']);
                    this.initForm.get('naturePiece').setValue(resp['data']['responsable']['naturePiece']['id']);
                    this.initForm.get('numeroPiece').setValue(resp['data']['responsable']['numeroPiece']);
                }


                if (selectedValue == 'particulier') {
                    // execute it after 1 seconds
                    setTimeout(() => {

                        this.searchClient();

                        // Mark for check
                        this.changeDetectorRefs.markForCheck();
                    }, 1000);
                } else {
                    setTimeout(() => {

                        this.searchClient();

                        // Mark for check
                        this.changeDetectorRefs.markForCheck();
                    }, 5000);
                }
            }
        });
    }

    getListPays() {
        this.coreService.list('pays', 0, 1000)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.countries = response['data'];
                    this.changeDetectorRefs.markForCheck();
                }
            });
    }


    getListNaturePieces() {
        this.coreService.list('nature-piece', 0, 100)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.naturePieces = response['data'];
                    this.changeDetectorRefs.markForCheck();
                }
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


    addMandataire() {
        const value = this.initForm.value;
        this.snackbar.showConfirmation('Voulez-vous vraiment ajouter ce mandataire ?').then((result) => {
            if (result['value'] == true) {
                this.isSearch = true;
                this.changeDetectorRefs.markForCheck();
                const value = this.initForm.value;

                let data={
                    "compte":this.compte,
                    "personnePhysique":this.personnePhysiqueID,
                    "dateFin":value['duree']
                };
                this.url = 'mandataire';
                this.coreService.addItem(data, this.url).subscribe(
                    (resp) => {
                        if (resp) {
                            this.isSearch = false;
                            this.changeDetectorRefs.markForCheck();
                            this.matDialogRef.close(resp);
                            this.snackbar.openSnackBar('Mandataire ajouté avec succés', 'OK', ['mycssSnackbarGreen']);
                        } else {
                            this.isSearch = false;
                            this.changeDetectorRefs.markForCheck();
                            this.snackbar.openSnackBar(resp['cause']['message'], 'OK', ['mycssSnackbarRed']);
                        }
                    },
                    (error) => {
                        this.isSearch = false;
                        this.changeDetectorRefs.markForCheck();
                        this.snackartService.showErrors(error);
                    });
            }
        });

    }

    updateItems() {
        this.snackbar.showConfirmation('Voulez-vous vraiment modifier ce mandataire ?')
            .then((result) => {
                if (result['value'] == true) {
                    this.isSearch = true;
                    const value = this.initForm.value;
                    let data={
                        "compte":this.compte,
                        "mandataire":this.personnePhysiqueID,
                        "duree":value['duree']
                    };
                    this.coreService.updateItem(value, this.id, 'client').subscribe(
                        (resp) => {
                            if (resp) {
                                this.isSearch = false;
                                this.matDialogRef.close(resp);
                                this.snackbar.openSnackBar('Mandataire modifié avec succés', 'OK', ['mycssSnackbarGreen']);
                            } else {
                                this.isSearch = false;
                                this.snackbar.openSnackBar(resp['message'], 'OK', ['mycssSnackbarRed']);
                            }
                        },
                        (error) => {
                            this.isSearch = false;
                            this.snackartService.showErrors(error);
                        });
                }
            });

    }

    checkRecaptype(type) {
        if (this.initForm.invalid) {
            this.checkValidity(this.initForm);
        } else {
            if (type == this.constantes.TYPEACTION.NEW) {
                this.addMandataire();
            } else if (type == this.constantes.TYPEACTION.EDIT) {
                this.updateItems();
            }
        }
    }

    // cette fonction de changer les champs obligatoires du formulaire en non obligatoire
    clearValidatorsMethode(form, tab) {
        for (const key in form.controls) {
            if (tab.indexOf(key) != -1) {
                form.get(key).clearValidators();
                form.get(key).updateValueAndValidity();
            }
        }
    }

    protected readonly open = open;
}
