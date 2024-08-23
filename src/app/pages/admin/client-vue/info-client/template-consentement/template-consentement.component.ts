import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CoreService} from 'app/core/core/core.service';
import {CONSTANTES} from '../../../admin/model/constantes';
import {ImpressionService} from "../../../../../shared/Impression.service";
import {models} from "../../../admin/model/model";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'app-template-consentement',
    templateUrl: './template-consentement.component.html',
    styleUrls: ['./template-consentement.component.scss']
})
export class TemplateConsentementComponent {
    @ViewChild('productionHebdo', {static: false}) public productionHebdo: ElementRef;
    dialogTitle: string;
    loader: boolean;
    action: string;
    canAdd: boolean;
    constantes = CONSTANTES;
    fields: any;
    labelButton;
    dialogRef: any;
    templateSrc: any;
    isLoader: boolean = false;
    logoInstitution;
    infos: any;
    lienBrute: any;
    constructor(public matDialogRef: MatDialogRef<TemplateConsentementComponent>,
                @Inject(MAT_DIALOG_DATA) _data,
                private coreService: CoreService,
                private route: ActivatedRoute,
                protected impressionService: ImpressionService
    ) {
        //@ts-ignore
        this.lienBrute = this.route.snapshot._routerState.url;
        const lien = this.lienBrute.substring(1, this.lienBrute.length);
        const currentLag = 'fr';
        this.infos = models[lien + '-' + currentLag];
        this.fields = _data.client;
        this.templateSrc = _data.templateClient;
        this.dialogTitle = 'Lettre de consentement';
        this.logoInstitution = this.coreService.decriptDataToLocalStorage('CD-@--9');
        this.logoInstitution = this.logoInstitution['logo'];
    }

    captureScreen(autoPrint = false) {
        this.impressionService.imprimer(this.productionHebdo, {
            fileName: 'Lettre-de-consentement',
            textColor: '#0000',
            fontSize: 11
        }, autoPrint, null, () => {
            this.matDialogRef.close({operation: "impression", data: this.fields});
        });
    }


}
