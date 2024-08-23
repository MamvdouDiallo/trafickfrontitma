import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'app/core/auth/snackBar.service';
import moment from 'moment';
import { CoreService } from 'app/core/core/core.service';
import { CONSTANTES } from '../../../admin/model/constantes';

@Component({
    selector: 'app-financer-credit',
    templateUrl: './financer-credit.component.html',
    styleUrls: ['./financer-credit.component.scss']
})
export class FinancerCreditComponent {
    dialogTitle: string;
    labelButton: string;
    suffixe: string = 'Crédit';
    dialogRef: any;
    loader: boolean;
    offset: number = 0;
    pageSize: number = 10;
    constantes = CONSTANTES;
    clientInfo: any;
    dateMiseEnplace: any;
    dureeDiffereJour: any;
    datePremiereEcheanceSouhaite: any;
    typeFinanement: any;
    currentCredit;
    isLoading: boolean=false;
    tableAmortissement: any = [];
    typeFinancementList = [{name:'VIREMENT',value:'VIREMENT'}];
    numeroCompte: any;
    today = new Date();
    montantCapitalTotal: any;
    montantEcheanceTotal: any;
    interetsTotals: any;
    dateComptable: any;
    maxDate;
    minDate;
    minCDate;
    maxCDate;
    constructor(public matDialogRef: MatDialogRef<FinancerCreditComponent>,
                @Inject(MAT_DIALOG_DATA) _data,
                private coreService: CoreService,
                private changeDetectorRefs: ChangeDetectorRef,
                private snackbar: SnackBarService,
                ) {

        this.labelButton = 'Ajouter';
        this.currentCredit = _data.credit;
        this.dialogTitle = 'Financer Crédit';
        this.clientInfo = this.coreService.decriptDataToLocalStorage('CD-@--119');

        this.coreService.list('date-traitement', 0, 1000)
            .subscribe((response) => {
                if(response){
                    this.dateComptable = response.filter(el => el.code == 'JOUR').map(e => e.dateComptable)[0];
                    this.dateMiseEnplace = moment(this.dateComptable).format('YYYY-MM-DD');
                    let dat =  moment(this.dateComptable).format('MM-DD-YYYY')
                    this.today = new Date(dat);
                    this.dureeDiffereJour = this.currentCredit?.dureeDiffereJour;
                    this.changeDetectorRefs.markForCheck();
                }
            },(error)=> {
                this.snackbar.showErrors(error);
            });
        this.numeroCompte = this.currentCredit?.numero;
        this.typeFinanement=this.typeFinancementList[0].value;
        this.getDatePremierEcheance();
    }
    checkTypeFinancement(){
        // this.datePremiereEcheanceSouhaite=moment(this.dateComptable).add(this.currentCredit?.dureeDiffereJour,'day').format('YYYY-MM-DD')
        // if(this.numeroCompte){
        //     this.checkDateMiseEnPlace();
        // }
    }
    getDatePremierEcheance(){
        let url="credit/premiere-echeance?codeTypeCredit="+this.currentCredit?.typeCredit?.code+"&codePeriodicite="+this.currentCredit?.periodicite?.code;
        this.coreService.listv2(url, 0, 10)
            .subscribe((response) => {
                if (response) {
                    this.minDate= response['min'];
                    this.maxDate= response['max'];
                    this.minCDate= moment(this.minDate).format('DD-MM-YYYY')
                    this.maxCDate= moment(this.maxDate).format('DD-MM-YYYY')
                    this.datePremiereEcheanceSouhaite=this.minDate;
                    this.changeDat(this.datePremiereEcheanceSouhaite);
                    this.changeDetectorRefs.markForCheck();
                }
            });
    }
    checkDateMiseEnPlace(){
        this.isLoading = true;
        const data = {
            'montantCredit': this.currentCredit?.montant,
            'tauxInteret': this.currentCredit?.taux,
            'dureeCredit': this.currentCredit?.nombreEcheance,
            'typeAmortissement': (this.currentCredit?.typeCredit?.modeCalculAmortissement).toLowerCase(),
            'frequenceInteret': (this.currentCredit?.typeCredit?.frequenceCalculInteret).toLowerCase(),
            'differeMois': this.currentCredit?.dureeDiffereMois,
            'dateMiseEnPlace':this.dateMiseEnplace,
            'dureeDiffereJour': this.currentCredit?.dureeDiffereJour,
            'datePremiereEcheance': this.datePremiereEcheanceSouhaite,
            'typeCredit': this.currentCredit?.typeCredit?.id,
            'periodicite': this.currentCredit?.periodicite?.code,
            };
            this.coreService.addItem(data,'tableau-amortissement').subscribe((resp) => {
            if (resp) {
                this.isLoading = false;
                this.tableAmortissement = resp[this.constantes?.TABLEAUAMORTISSEMENT];

                this.montantCapitalTotal = resp['montantCapitalTotal'];
                this.montantEcheanceTotal = resp['montantEcheanceTotal'];
                this.interetsTotals = resp['interetsTotals'];

                this.changeDetectorRefs.markForCheck();
            } else {
                this.isLoading = false;
            }
        }, (error) => {
            this.isLoading = false;
                this.snackbar.showErrors(error);
        });

    }
    changeDat(date){
        this.datePremiereEcheanceSouhaite= moment(this.datePremiereEcheanceSouhaite).format('YYYY-MM-DD')
        this.checkDateMiseEnPlace();

    }

    financerCredit() {
        this.snackbar.showConfirmation('Voulez-vous vraiment financer ce crédit ?').then((result) => {
            if (result['value'] == true) {
                this.loader = true;
                const value = {
                    'dateFinancement': this.dateMiseEnplace,
                    'typeFinancement' : this.typeFinanement,
                    'datePremiereEcheance' : moment(this.datePremiereEcheanceSouhaite).format('YYYY-MM-DD'),
                };
                this.coreService.financer(value,this.currentCredit?.id,'credit/financer').subscribe(
                    (resp) => {
                        if (resp) {
                            this.loader = false;
                            this.matDialogRef.close(resp);
                            this.snackbar.openSnackBar('Crédit financé avec succés', 'OK',['mycssSnackbarGreen']);
                        } else {
                            this.loader = false;
                            this.snackbar.openSnackBar(resp['cause']['message'], 'OK',['mycssSnackbarRed']);
                        }
                    },
                    (error) => {
                        this.loader = false;
                        this.snackbar.showErrors(error);
                    });
            }
        });

    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }






}
