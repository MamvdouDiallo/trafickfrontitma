import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SnackBarService} from 'app/core/auth/snackBar.service';
import {CoreService} from 'app/core/core/core.service';
import {CONSTANTES} from '../../../admin/model/constantes';
import {models} from "../../../admin/model/model";
import {ActivatedRoute} from "@angular/router";
import * as moment from "moment/moment";

@Component({
    selector: 'app-ajout-credit',
    templateUrl: './ajout-virement-permanent-vue.component.html',
    styleUrls: ['./ajout-virement-permanent-vue.component.scss']
})
export class AjoutVirementPermanentVueComponent implements OnInit {
    dialogTitle: string;
    id: string;
    creditForm: UntypedFormGroup;
    labelButton: string;
    suffixe: string;
    dialogRef: any;
    loader: boolean = false;
    isDisabled: boolean = false;
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
    infoClient: any;
    listComptes: any;
    listCompte: any;
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
    dateFinVirement;
    btnBloquerDiff: boolean = false;
    montantMinText: any;
    montantMaxText: any;
    tauxMin: any;
    tauxMax: any;
    echeanceMin: any;
    echeanceMax: any;
    comptes: Array<any> = [];
    comptesDebit: Array<any> = [];
    differerMin: any;
    differerMax: any;
    dateComptable;
    agenceId: any;
    privilegeByRole: any;


    constructor(public matDialogRef: MatDialogRef<AjoutVirementPermanentVueComponent>,
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

            const dateCompt = this.creditForm.get('dateMiseEnPlace');
            dateCompt.setValue(this.dateComptable);
            dateCompt.disable({onlySelf: true});
            this.suffixe ='Virement permanent'
            this.dialogTitle = this.labelButton + this.suffixe;

        this.privilegeByRole = this.coreService.decriptDataToLocalStorage('CD-1');
        this.clientInfo = this.coreService.decriptDataToLocalStorage('CD-@--119');
    }


    ngOnInit(): void {
        this.agenceId = this.coreService.decriptDataToLocalStorage('CD-@2');
        this.initForm();
        this.getlistClient();
        this.getListActiviteClient();
        this.getListDevise();
        this.getListPeriodicite();
        this.getListProgrammes();
        this.checkCodePrivilegeForRole();
        this.comptes = [this.clientInfo];
        const debit = this.creditForm.get('clientDebiteur');

        debit.setValue(this.clientInfo?.id)
        debit.disable({onlySelf: true});
        this.getCompteRecep(this.clientInfo.id)
    }

    checkCodePrivilegeForRole() {
        this.forcerSaisieTauxCredit = this.privilegeByRole.indexOf('0' + (this.privilegeForPage + 6)) != -1;
    }

    initForm(): UntypedFormGroup {
        return this.fb.group({
            compteCredit: ['', [Validators.required]],
            compteDebit: ['', [Validators.required]],
            montantVirement: ['', [Validators.required]],
            periodicite: ['', [Validators.required]],
            dureeEnMois: ['', [Validators.required]],
            nbreJourRechercheProvision: ['', [Validators.required]],
            dateMiseEnPlace: ['', [Validators.required]],
            datePremierEcheance: ['', [Validators.required]],
            dateFinVirement: ['', [Validators.required]],
            motifVirement: ['', [Validators.required]],
            client: [this.clientInfo?.id, [Validators.required]],
            clientDebiteur: [this.clientInfo?.id,[Validators.required]]
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
    verification(event?) {
        if (event) {
            const numCompte = event['term'];
            this.rechercheNumCompte(numCompte);
        }

    }
    verifications(event?) {
        if (event) {
            const numCompte = event['term'];
            this.rechercheNumComptes(numCompte);
        }

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
                        this.comptesDebit = response['data'];
                        this.changeDetectorRefs.markForCheck();
                    }
                });
        }
    }
    rechercheNumComptes(comptes) {
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
    getCompteRecep(evt?) {
        if (this.comptes.length != 0) {
            this.infoClient = this.comptes.filter(el => el.id == evt);
            this.listCompte = this.infoClient[0].comptesCourants;
            // this.creditForm.get('clientDebiteur').reset()
        }
    }
    getCompteDebit(evt?) {
        if (this.comptesDebit.length != 0) {
            this.infoClient = this.comptesDebit.filter(el => el.id == evt);
            this.listComptes = this.infoClient[0].comptesCourants
        }
    }
    checkDateVirement(event) {
        let dateEcheance = moment(this.creditForm.get('datePremierEcheance').value, 'DD/MM/YYYY').toDate();
        let nombreMois = this.creditForm.get('dureeEnMois').value;
        let dateFin = this.creditForm.get('dateFinVirement');
        let dateMiseEnPlace = moment(this.dateComptable).format('DD/MM/YYYY');
        if(dateEcheance && nombreMois && dateEcheance) {
            this.dateFinVirement = moment(dateEcheance).add(Number(nombreMois), 'month');
            dateFin.setValue( moment(this.dateFinVirement, 'DD/MM/YYYY').toDate())
            dateFin.disable({onlySelf: true})
            this.isDisabled = false;
            if(dateEcheance < moment(dateMiseEnPlace, 'DD/MM/YYYY').toDate()) {
                this.isDisabled = true;
                this.snackbar.openSnackBar('La date écheance doit être supérieure à la date de mise en place', 'OK', ['mycssSnackbarRed']);
                dateFin.reset();
                dateFin.enable({onlySelf: true});
            }else{
                this.isDisabled = false;
            }
        }

    }
    checkTypeCredit() {
        this.tauxReadOnly = false;
        const typeCredit = this.creditForm.get('typeCredit').value;
        if (typeCredit) {
            this.typeCreditValue = this.typeCreditList.find(el => el.id == typeCredit);

            if (this.typeCreditValue) {
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
            }
        }
    }

    programmeCredit(item) {
        if(item) {
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
        this.isLoader=true;
        this.coreService.list('activite-client', this.offset, this.pageSize)
            .subscribe((response) => {

                if (response) {
                    this.isLoader=false;
                    this.activiteClientList = response['data'];
                    this.changeDetectorRefs.markForCheck();
                }
            },(error) => {
            this.loader = false;
            this.snackbar.showErrors(error);
        });
    }
    getListSousActiviteClient(item){
        if(item){
            this.sousActiviteClientList = item.sousActivites;
        }

    }



    getListDevise() {
        this.isLoader=true;
        this.coreService.list('devise', this.offset, this.pageSize)
            .subscribe((response) => {
                if (response['responseCode'] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                    this.isLoader=false;
                    this.deviseList = response['data'];
                    this.changeDetectorRefs.markForCheck();
                }
            },(error) => {
            this.loader = false;
            this.snackbar.showErrors(error);
        });
    }

    getListPeriodicite() {
        this.loader = true;
        this.coreService.listv2('get-periodicites?categorie=VIRPERM', this.offset, this.pageSize)
            .subscribe((response) => {
                if (response) {
                    this.periodiciteList = response;
                    this.changeDetectorRefs.markForCheck();
                }
            },(error) => {
            this.loader = false;
            this.snackbar.showErrors(error);
        });
    }

    getListProgrammes() {
        this.loader = true;
        this.coreService.list('programme', this.offset, this.pageSize)
            .subscribe((response) => {
                if (response['responseCode'] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                    this.loader = false;
                    this.listProgrammeCredit = response['data'];
                    this.changeDetectorRefs.markForCheck();
                }
            },(error) => {
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
        this.snackbar.showConfirmation('Voulez-vous vraiment ajouter ce virement permanent ?').then((result) => {
            if (result['value'] == true) {
                this.loader = true;
                const value = this.creditForm.value;
                value['dateMiseEnPlace']= this.dateComptable
                value['client']= this.clientInfo?.id
                    this.coreService.addItem(value, 'virements-permanents').subscribe(
                        (resp) => {
                            if (resp) {
                                this.loader = false;
                                this.matDialogRef.close(resp);
                                this.snackbar.openSnackBar('Virement permanent ajoutée avec succés', 'OK', ['mycssSnackbarGreen']);
                            } else {
                                this.loader = false;
                                this.snackbar.openSnackBar(resp['cause']['message'], 'OK', ['mycssSnackbarRed']);
                            }
                        },
                        (error) => {
                            this.loader = false;
                            this.snackbar.showErrors(error);
                        });
                // }
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
