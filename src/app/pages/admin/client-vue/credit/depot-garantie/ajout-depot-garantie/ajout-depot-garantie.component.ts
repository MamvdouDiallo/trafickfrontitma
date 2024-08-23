import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';
import { CoreService } from 'app/core/core/core.service';
import { CONSTANTES } from 'app/modules/presentation/admin/model/constantes';
import {SnackBarService} from "app/core/auth/snackBar.service";

@Component({
    selector: 'add-depot-garantie',
    templateUrl: './ajout-depot-garantie.component.html',
    styleUrls: ['./ajout-depot-garantie.component.scss']
})
export class AjoutDepotGarantieComponent implements OnInit {
    dialogTitle: string;
    id: string;
    initForm: UntypedFormGroup;
    labelButton: string;
    suffixe: string = 'une garantie';
    dialogRef: any;
    loader: boolean;
    action: string;
    offset: number = 0;
    pageSize: number = 10;
    url ='garantie-credit';
    constantes = CONSTANTES;
    compteGaranties: any;
    listTypeGaranties: any;
    credit: any;
    fields;
    idClient = this.coreService.decriptDataToLocalStorage('CD-@--119')?.id;
    garantieType: any;
    personnePhysiqueList: any;
    tauxReadOnly = false;
    tauxTypeCredit;
    labelMontant="Montant total de la garantie";
    constructor(public matDialogRef: MatDialogRef<AjoutDepotGarantieComponent>,
                @Inject(MAT_DIALOG_DATA) _data,
                private fb: UntypedFormBuilder,
                private coreService: CoreService,
                private snackartService : SnackBarService,
                private changeDetectorRefs: ChangeDetectorRef,
                private snackBar: MatSnackBar,
                ) {
        if (_data.action == this.constantes.TYPEACTION.NEW){
            this.labelButton = 'Ajouter ';
        }else {
            this.labelButton = 'Modifier ';
            this.fields  = _data?.information;
        }
        this.id = _data.id;
        this.dialogTitle = this.labelButton + this.suffixe;
        this.listTypeGaranties = _data?.listTypeGaranties;
        this.credit = _data.credit;
        if(this.credit){
            this.tauxTypeCredit =  this.credit.typeCredit.taux;
        }
        this.getListCompteGaranties();

    }

    ngOnInit(): void {
        this.initForm = this.fb.group({
            typeGarantie: this.fb.control('',[Validators.required]),
            taux: this.fb.control(this.tauxTypeCredit),
            montant: this.fb.control(''),
            montantTotalGarantie: this.fb.control('',[Validators.required]),
            compteGarantie: this.fb.control(''),
            credit: this.fb.control(this.credit?.id),
            personneGarantie : this.fb.control('',[Validators.required]),
            description : this.fb.control(''),
        });
        if (this.action == this.constantes.TYPEACTION.EDIT) {
            this.initForm.patchValue(this.fields);
        }
        this.getListTypeGaranties();
        this.getListPersonnePhysique();
    }
    checkClearValidator(typeGarantie) {
        if(typeGarantie['code']!='CAUTION_SOLIDAIRE') {
            this.clearValidatorsMethode(this.initForm, ['personneGarantie']);
        }else if(typeGarantie['code']=='CAUTION_SOLIDAIRE'){
            this.setValidatorsMethode(this.initForm, ['personneGarantie']);
            this.labelMontant = "Montant d’engagement ";
        }
    }

    clearValidatorsMethode(form, tab) {
        for (const key in form.controls) {
            if (tab.indexOf(key) != -1) {
                form.get(key).clearValidators();
                form.get(key).updateValueAndValidity();
            }
        }
    }
    setValidatorsMethode(form, tab) {
        for (const key in form.controls) {
            if (tab.indexOf(key) != -1) {
                form.get(key).setValidators(Validators.required);
                form.get(key).updateValueAndValidity();
            }
        }
    }
    getListCompteGaranties(){
        this.coreService.getElement(this.idClient,'compte-prevoyance-client')
            .subscribe((response) => {
                if (response['responseCode'] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                    this.compteGaranties = response['data'];
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

    openSnackBar(message: string,action: string,duration: number,classe: string): void {
        this.snackBar.open(message, action, {
            verticalPosition: 'bottom',
            duration: duration?duration:2000,
            panelClass: [classe]
        });
    }
    openSwal(title: string, text: string, icon: SweetAlertIcon, confirmButtonText: string, cancelButtonText: string): Promise<SweetAlertResult<any>>{
        return swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText
        });
    }
    addItems() {
        this.openSwal('Confirmation','Voulez-vous vraiment ajouter ce depôt de garantie?','warning','Valider','Annuler').then((result) => {
            if (result['value'] == true) {
                this.loader = true;
                 this.initForm.controls['taux'].setValue(this.initForm.get('taux').value.toString());
                const value = this.initForm.value;
                this.coreService.addItem(value, this.url).subscribe(
                    (resp) => {
                        if (resp) {
                            this.loader = false;
                            this.matDialogRef.close(resp);
                            this.openSnackBar('depôt de garantie ajouté avec succés','OK',2000,'mycssSnackbarGreen');
                        } else {
                            this.loader = false;
                            this.openSnackBar(resp['cause']['message'],'OK',2000,'mycssSnackbarRed');
                        }
                    },
                    (error) => {
                        this.loader = false;
                        this.loader = false;
                        this.snackartService.showErrors(error);
                    });
            }
        });

    }
    updateItems() {
        this.openSwal('Confirmation','Voulez-vous vraiment modifier ce depôt de garantie','warning','Valider','Annuler').then((result) => {
            if (result['value'] == true) {
                this.loader = true;
                const value = this.initForm.value;

                this.coreService.updateItem(value, this.id, this.url).subscribe(
                    (resp) => {
                        if (resp) {
                            this.loader = false;
                            this.matDialogRef.close(resp);
                            this.openSnackBar('Dépôt de garantie modifié avec succés','OK',2000,'mycssSnackbarGreen');
                        } else {
                            this.loader = false;
                            this.snackBar.open(resp['message'], 'OK', {
                                verticalPosition: 'bottom',
                                duration: 10000,
                                panelClass: ['mycssSnackbarRed']
                            });
                        }
                    },
                    (error) => {
                        this.loader = false;
                        this.snackartService.showErrors(error);
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
    switchTypeGarantie($event){
       this.garantieType = this.listTypeGaranties?.find(typeGarantie=> typeGarantie.id == $event.value);
       if(this.garantieType?.code == this.constantes.TYPE_GARANTIE.GAGE_BIJOU || this.garantieType?.code == this.constantes.TYPE_GARANTIE.HYPOTHEQUE || this.garantieType?.code == this.constantes.TYPE_GARANTIE.NANTISSEMENT_MATERIEL || this.garantieType?.code == this.constantes.TYPE_GARANTIE.NANTISSEMENT_VEHICULE || this.garantieType?.code == this.constantes.TYPE_GARANTIE.CAUTION_SOLIDAIRE){
           this.tauxReadOnly = true;
       }
       else {
           this.tauxReadOnly = false;

       }
    }


    montantTotalGarantie(){
        const montant = Number(this.initForm.get('montant').value);
        const taux = this.initForm.get('taux').value;
        const montantCredit = this.credit?.montant;
        const  montantTotalGarantie = ((taux * montantCredit) / 100) + montant;
        this.initForm.controls['montantTotalGarantie'].setValue(montantTotalGarantie);
    }

    protected readonly open = open;

    getListTypeGaranties(){
        this.loader = true;
        this.changeDetectorRefs.markForCheck();
        this.coreService.list('type-garantie',0,10).subscribe((resp) => {
            this.listTypeGaranties = resp[this.constantes.RESPONSE_DATA].filter(el=>el.code !== 'EPARGNE_NANTIE');
            this.loader = false;
            this.changeDetectorRefs.markForCheck();
        },
            (error) => {
                this.loader = false;
                this.changeDetectorRefs.markForCheck();
            });
    }


    getListPersonnePhysique(){
        this.coreService.list('personne-physique',0,100).subscribe((resp) => {
            this.personnePhysiqueList = resp[this.constantes.RESPONSE_DATA];
            this.changeDetectorRefs.markForCheck();
        });
    }
}
