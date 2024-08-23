import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackBarService} from 'app/core/auth/snackBar.service';
import {CoreService} from 'app/core/core/core.service';
import {CONSTANTES} from '../../../admin/model/constantes';
import {models} from "../../../admin/model/model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-ajout-credit',
    templateUrl: './ajout-credit.component.html',
    styleUrls: ['./ajout-credit.component.scss']
})
export class AjoutCreditComponent implements OnInit {
    dialogTitle: string;
    id: string;
    creditForm: UntypedFormGroup;
    labelButton: string;
    suffixe: string;
    agentCredit: Array<any> = [];
    dialogRef: any;
    loader: boolean = false;
    forcerSaisieTauxCredit: boolean;
    isLoader: boolean = false;
    action: string;
    informations: any;
    offset: number = 0;
    pageSize: number = 10;
    constantes = CONSTANTES;
    typeCreditList: any;
    activiteClientList: any;
    sousActiviteClientList: any;
    compteRemboursementList: any;
    deviseList: any;
    periodiciteList: any;
    privilegeForPage: number = 8010;
    typeCreditValue: any;
    tauxReadOnly = false;
    differerReadOnly = true;
    clientInfo: any;
    clientInform: any;
    listProgrammeCredit: any;
    listClient: any;
    today = new Date();
    btnBloquer: boolean = false;
    lienBrute = '';
    btnBloquerDiff: boolean = false;
    montantMinText: any;
    montantMaxText: any;
    tauxMin: any;
    tauxMax: any;
    echeanceMin: any;
    echeanceMax: any;
    differerMin: any;
    differerMax: any;
    dateComptable;
    agenceId: any;
    infoClient;
    listComptes;
    privilegeByRole: any;
    comptes: Array<any> = [];


    constructor(public matDialogRef: MatDialogRef<AjoutCreditComponent>,
                @Inject(MAT_DIALOG_DATA) _data,
                private fb: UntypedFormBuilder,
                private coreService: CoreService,
                private route: ActivatedRoute,
                private changeDetectorRefs: ChangeDetectorRef,
                private snackbar: SnackBarService
    ) {

        if (_data.action == 'new') {

            this.labelButton = 'Ajouter ';
            this.creditForm = this.initForm();
        } else {
            this.labelButton = 'Modifier ';

        }
        //@ts-ignore
        this.lienBrute = this.route.snapshot._routerState.url;
        this.dateComptable = this.coreService.decriptDataToLocalStorage('DC-@--1');


        const lien = this.lienBrute.substring(1, this.lienBrute.length);
        const currentLag = 'fr';
        this.informations = models[lien + '-' + currentLag];

        this.action = _data?.action;
        this.id = _data.id;
        if (this.informations?.url === 'demandes-credits') {
            const dateCompt = this.creditForm.get('dateMiseEnPlace');
            dateCompt.setValue(this.dateComptable);
            dateCompt.disable({onlySelf: true});
            this.suffixe = 'Demande de crédit'
            this.dialogTitle = this.labelButton + this.suffixe;
        } else {
            this.suffixe = 'Crédit'
            this.dialogTitle = this.labelButton + this.suffixe;
        }
        this.privilegeByRole = this.coreService.decriptDataToLocalStorage('CD-1');
        this.clientInfo = this.coreService.decriptDataToLocalStorage('CD-@--119');

    }


    ngOnInit(): void {

        this.agenceId = this.coreService.decriptDataToLocalStorage('CD-@2');
        this.initForm();
        this.getlistClient();
        this.getListActiviteClient();
        if (this.informations?.url !== 'demandes-credits') {
            this.getListCompteRemboursement();
        } else {

        }
        this.getListDevise();

        this.getListAgent(this.agenceId?.id);
        this.getListPeriodicite();
        this.getListProgrammes();
        this.checkCodePrivilegeForRole();
    }

    checkCodePrivilegeForRole() {
        this.forcerSaisieTauxCredit = this.privilegeByRole.indexOf('0' + (this.privilegeForPage + 6)) != -1;
    }

    initForm(): UntypedFormGroup {
        return this.fb.group({
            typeCredit: ['', [Validators.required]],
            objetFinancement: ['', [Validators.required]],
            compteRemboursement: ['', [Validators.required]],
            devise: ['', [Validators.required]],
            taux: ['', [Validators.required]],
            montant: ['', [Validators.required]],
            dateMiseEnPlace: ['', [Validators.required]],
            nombreEcheance: ['', [Validators.required]],
            periodicite: ['', [Validators.required]],
            dureeDiffereJour: [''],
            activite: ['', [Validators.required]],
            sousActivite: [''],
            client: [''],
            agentCredit: ['', [Validators.required]]
        });
    }

    open() {
        this.tauxReadOnly = true;
    }

    getlistClient() {
        this.coreService.getElement(this.agenceId?.id, 'clients-agence').subscribe((resp) => {
            if (resp['responseCode'] == this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.listClient = resp[this.constantes.RESPONSE_DATA];

            } else {

            }
        });
    }

    checkTypeCredit() {
        this.tauxReadOnly = false;
        const typeCredit = this.creditForm.get('typeCredit').value;
        if (typeCredit) {
            this.typeCreditValue = this.typeCreditList.find(el => el.id == typeCredit);
            if (this.typeCreditValue) {
                if(this.typeCreditValue.demandeObligatoire==false || this.informations?.url === 'demandes-credits'){
                this.creditForm.get('taux').setValue(this.typeCreditValue?.taux);
                this.creditForm.get('nombreEcheance').setValue(this.typeCreditValue?.maxEcheance);
                this.tauxReadOnly = this.typeCreditValue.tauxASaisir ? true : false;
                this.montantMinText = this.typeCreditValue?.montantMinCredit;
                this.montantMaxText = this.typeCreditValue?.montantMaxCredit;
                this.tauxMin = this.typeCreditValue?.tauxMin;
                this.tauxMax = this.typeCreditValue?.tauxMax;
                this.echeanceMin = this.typeCreditValue?.minEcheance;
                this.echeanceMax = this.typeCreditValue?.maxEcheance;
                this.differerMin = this.typeCreditValue?.minDifferer;
                this.differerMax = this.typeCreditValue?.maxDifferer;
                if (this.differerMin == 0 && this.differerMax == 0) {
                    //  this.creditForm.get('dureeJour').setValue(0);
                    this.differerReadOnly = false;
                } else {
                    this.differerReadOnly = true;
                    // this.creditForm.get('dureeJour').setValue('');
                }
            }else if(this.typeCreditValue.demandeObligatoire==true && this.informations?.url !== 'demandes-credits'){
                    this.snackbar.openSnackBar('Merci de passer par le menu demande de crédit, pour ce type de crédit !', 'OK', ['mycssSnackbarRed']);
                    this.matDialogRef.close();
                }
        }
        }
    }
    verification(event?) {
        if (event) {
            const numCompte = event['term'];
            this.rechercheNumCompte(numCompte);
        }

    }
    getListAgent(idGestionnaire) {
        this.coreService.listv2('agent?agenceId=' + idGestionnaire, 0, 100).subscribe((resp) => {
            this.agentCredit = resp['data']
        });
    }
    rechercheNumCompte(comptes) {
        const numCompte = comptes;
        const data = {
            'max': 10,
            'offset': 0,
            'search': numCompte
        };
        const compte = numCompte.toString();
        const taille = compte.length;

        if (taille >= 3) {
            this.coreService.addItem(data, 'rechercher_client')
                .subscribe((response) => {
                    if (response['responseCode'] === 200) {
                        this.comptes = response['data'];
                        this.changeDetectorRefs.markForCheck();
                    }
                });
        }
    }
    getCompteDebit(evt?) {
        if (this.comptes.length != 0) {
            this.infoClient = this.comptes.filter(el => el.id == evt);
            this.listComptes = this.infoClient[0].comptesCourants;
        }
    }
    programmeCredit(item) {
        if (item) {
            this.typeCreditList = item['typeCredits'];
        }

    }

    checkTaux() {
        if (this.tauxReadOnly) {
            const taux = this.creditForm.get('taux').value;
            const min = this.typeCreditValue?.tauxMin;
            const max = this.typeCreditValue?.tauxMax;
            if (taux >= min && taux <= max) {
                this.btnBloquer = false;
            } else {
                this.snackbar.openSnackBar('Le taux doit être compris entre ' + min + ' - ' + max, 'OK', ['mycssSnackbarRed']);
                this.btnBloquer = true;
            }
        }
    }


    checkMontant() {
        const montant = this.creditForm.get('montant').value;
        const min = this.typeCreditValue?.montantMinCredit;
        const max = this.typeCreditValue?.montantMaxCredit;
        if (montant >= min && montant <= max) {
            this.btnBloquer = false;
        } else {
            this.snackbar.openSnackBar('Le montant doit être compris entre ' + min + ' - ' + max, 'OK', ['mycssSnackbarRed']);
            this.btnBloquer = true;
        }
    }


    checkDifferer() {
        if (this.differerReadOnly) {
            const dureeJour = this.creditForm.get('dureeDiffereJour').value;
            const min = this.typeCreditValue?.minDifferer;
            const max = this.typeCreditValue?.maxDifferer;
            if (dureeJour >= min && dureeJour <= max) {
                this.btnBloquerDiff = false;
            } else {
                this.snackbar.openSnackBar('Le nombre de jour différé doit être compris entre ' + min + ' - ' + max, 'OK', ['mycssSnackbarRed']);
                this.btnBloquerDiff = true;
            }
        }
    }


    checkEcheance() {
        const echeance = this.creditForm.get('nombreEcheance').value;
        const min = this.typeCreditValue?.minEcheance;
        const max = this.typeCreditValue?.maxEcheance;
        if (echeance >= min && echeance <= max) {
        } else {
            this.snackbar.openSnackBar('Le nombre d\'écheance doit être compris entre ' + min + ' - ' + max, 'OK', ['mycssSnackbarRed']);
        }
    }

    getListActiviteClient() {
        this.isLoader = true;
        this.coreService.list('activite-client', this.offset, 1000)
            .subscribe((response) => {

                if (response) {
                    this.isLoader = false;
                    this.activiteClientList = response['data'];
                    this.changeDetectorRefs.markForCheck();
                }
            }, (error) => {
                this.loader = false;
                this.snackbar.showErrors(error);
            });
    }

    getListSousActiviteClient(item) {
        if (item) {
            this.sousActiviteClientList = item.sousActivites;
        }

    }

    getListCompteRemboursement(item?) {
        this.isLoader = true;
        this.clientInform = item;
        if (this.informations?.url === 'demandes-credits' && this.clientInform) {
            this.coreService.getElement(this.clientInform, 'compte-prevoyance-client')
                .subscribe((response) => {
                    if (response['responseCode'] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                        this.isLoader = false;
                        //this.compteRemboursementList = response['data'];
                        this.compteRemboursementList = this.clientInfo?.comptesCourants;
                        if (this.compteRemboursementList?.length!=0){
                            this.creditForm.get('compteRemboursement').setValue(this.compteRemboursementList[0]?.id);
                        }

                       // this.creditForm.get('compteRemboursement').setValue(this.compteRemboursementList[0]?.id);
                        this.changeDetectorRefs.markForCheck();
                    }
                }, (error) => {
                    this.loader = false;
                    this.snackbar.showErrors(error);
                });
        } else {
            this.coreService.getElement(this.clientInfo?.id, 'compte-prevoyance-client')
                .subscribe((response) => {
                    if (response['responseCode'] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                        this.isLoader = false;
                        this.compteRemboursementList = this.clientInfo?.comptesCourants;
                        if (this.compteRemboursementList?.length!=0){
                            this.creditForm.get('compteRemboursement').setValue(this.compteRemboursementList[0]?.id);
                        }
                        this.changeDetectorRefs.markForCheck();
                    }
                }, (error) => {
                    this.loader = false;
                    this.snackbar.showErrors(error);
                });
        }
    }

    getListDevise() {
        this.isLoader = true;
        this.coreService.list('devise', this.offset, this.pageSize)
            .subscribe((response) => {
                if (response['responseCode'] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                    this.isLoader = false;
                    this.deviseList = response['data'];
                    this.changeDetectorRefs.markForCheck();
                }
            }, (error) => {
                this.loader = false;
                this.snackbar.showErrors(error);
            });
    }

    getListPeriodicite() {
        this.loader = true;
        this.coreService.list('periodicite', this.offset, this.pageSize)
            .subscribe((response) => {
                if (response['responseCode'] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                    this.periodiciteList = response['data'];
                    this.changeDetectorRefs.markForCheck();
                }
            }, (error) => {
                this.loader = false;
                this.snackbar.showErrors(error);
            });
    }

    getListProgrammes() {
        this.loader = true;
        this.coreService.list('programme', this.offset, 1000)
            .subscribe((response) => {
                if (response['responseCode'] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                    this.loader = false;
                    this.listProgrammeCredit = response['data'];
                    this.changeDetectorRefs.markForCheck();
                }
            }, (error) => {
                this.loader = false;
                this.snackbar.showErrors(error);
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
        this.snackbar.showConfirmation('Voulez-vous vraiment ajouter ce crédit ?').then((result) => {
            if (result['value'] == true) {
                this.loader = true;
                const value = {...this.creditForm.value};
                value['client'] = this.clientInfo?.id;
                value['agence'] = this.clientInfo?.agence?.id;
                // value['agentCredit'] = this.clientInfo?.agentCredit?.id;
                value['dateMiseEnPlace'] = this.dateComptable;
                value['dureeDiffereJour'] = 0;
                if (this.informations?.url === 'demandes-credits') {
                    value['client'] = this.creditForm.get('client').value;
                    this.coreService.addItem(value, 'demandes-credits').subscribe(
                        (resp) => {
                            if (resp) {
                                this.loader = false;
                                this.matDialogRef.close(resp);
                                this.snackbar.openSnackBar('Crédit ajouté avec succés', 'OK', ['mycssSnackbarGreen']);
                            } else {
                                this.loader = false;
                                this.snackbar.openSnackBar(resp['cause']['message'], 'OK', ['mycssSnackbarRed']);
                            }
                        },
                        (error) => {
                            this.loader = false;
                            this.snackbar.showErrors(error);
                        });
                } else {
                    this.coreService.addItem(value, 'creer-credit').subscribe(
                        (resp) => {
                            if (resp) {
                                this.loader = false;
                                this.matDialogRef.close(resp);
                                this.snackbar.openSnackBar('Crédit ajouté avec succés', 'OK', ['mycssSnackbarGreen']);
                            } else {
                                this.loader = false;
                                this.snackbar.openSnackBar(resp['cause']['message'], 'OK', ['mycssSnackbarRed']);
                            }
                        },
                        (error) => {
                            this.loader = false;
                            this.snackbar.showErrors(error);
                        });
                }
            }
        });

    }

    updateItems() {
        this.snackbar.showConfirmation('Voulez-vous vraiment modifier cet actionnaire ?').then((result) => {
            if (result['value'] == true) {
                this.loader = true;
                const value = this.creditForm.value;
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
        if (this.creditForm.invalid || this.btnBloquer == true || this.btnBloquerDiff == true) {
            this.checkValidity(this.creditForm);
        } else {
            if (type == 'new') {
                this.addItems();
            } else if (type == 'edit') {
                this.updateItems();
            }
        }
    }

}
