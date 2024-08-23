import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {CoreService} from 'app/core/core/core.service';
import {AjoutClientsComponent} from '../../admin/client/ajout-clients/ajout-clients.component';
import {MessageService} from '../../admin/message/message.service';
import {CONSTANTES} from '../../admin/model/constantes';
import {
    AjoutPersonneMoraleComponent
} from '../../admin/personne-morale/ajout-personne-morale/ajout-personne-morale.component';
import {AjoutPersonnePhysiqueComponent} from '../../admin/personne-physique/ajout/ajout.component';
import {
    AjoutAttributComplementaireComponent
} from './ajout-attribut-complementaire/ajout-attribut-complementaire.component';
import {TemplateConsentementComponent} from './template-consentement/template-consentement.component';
import {SnackBarService} from 'app/core/auth/snackBar.service';


@Component({
    selector: 'info-client',
    templateUrl: './info-client.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoClientComponent implements OnInit {
    _attributComplementaire = [];
    @Input() infosClient;
    @Input() persPhysique;

    @Input()
    set attributComplementaire(data: any) {
        this._attributComplementaire = data ? data : [];
    }

    accountForm: UntypedFormGroup;
    data: any;
    paramsId: any;
    constantes = CONSTANTES;
    isLoading = false;
    dialogRef: any;
    naturePersonnesMorales: any = [];
    responsable: any = [];
    statutJuridiques: any = [];
    countries: any = [];
    listetemplate: any;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: UntypedFormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private coreService: CoreService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _matDialog: MatDialog,
        private snackbar: SnackBarService,
        private messageService: MessageService
    ) {
        if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
            this.data = this.router.getCurrentNavigation().extras.state.extraData.data;
        }

        this.route.params.subscribe((params) => {
            this.paramsId = params['id'];
        });
    }
    ngOnInit(): void {
        this.getListNaturePersonnesMorales();
        // // Create the form
        this.accountForm = this._formBuilder.group({
            name: ['Brian Hughes'],
            username: ['brianh'],
            title: ['Senior Frontend Developer'],
            company: ['YXZ Software'],
            about: ['Hey! This is Brian; husband, father and gamer. I\'m mostly passionate about bleeding edge tech and chocolate! 🍫'],
            email: ['hughes.brian@mail.com', Validators.email],
            phone: ['121-490-33-12'],
            country: ['usa'],
            language: ['english']
        });


        this.getListNaturePersonnesMorales();
        this.getListresponsable();
        this.getListStatutJuridique();
        this.getListPays();
    }


    getAttributComplementaireClient(infosClient) {
        this.isLoading = true;
        const data={
            'natureAttribut': 'CLIENT',
            'referenceObjet': infosClient.id
        };
        this.coreService.getAttributComplementaire(data,'attribut-complementaire/mine').subscribe((resp) => {
            if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                this.isLoading = false;
                this._attributComplementaire = resp[this.constantes.RESPONSE_DATA];
                this._changeDetectorRef.markForCheck();
            } else {
                this.isLoading = false;
            }
        }, () => {
            this.isLoading = false;
        });
    }

    getListNaturePersonnesMorales() {
        this.coreService.list('nature-personne-morale', 0, 1000)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.naturePersonnesMorales = response['data'];
                    this._changeDetectorRef.markForCheck();
                }
            });
    }

    getListresponsable() {
        this.coreService.list('personne-physique', 0, 1000)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.responsable = response['data'];
                    this._changeDetectorRef.markForCheck();
                }
            });
    }

    getListStatutJuridique() {
        this.coreService.list('statut-juridique', 0, 1000)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.statutJuridiques = response['data'];
                    this._changeDetectorRef.markForCheck();
                }
            });
    }

    getListPays() {
        this.coreService.list('pays', 0, 1000)
            .subscribe((response) => {
                if (response['responseCode'] === 200) {
                    this.countries = response['data'];
                    this._changeDetectorRef.markForCheck();
                }
            });
    }

    getNaturePersonneMorale(value: any) {
        const liste = this.naturePersonnesMorales.filter(type => type.id == value);
        return liste.length != 0 ? liste[0].libelle : value;
    }

    getResponsable(value: any) {
        const liste = this.responsable.filter(type => type.id == value);
        return liste.length != 0 ? liste[0].prenom + ' ' + liste[0].nom : value;
    }

    getstatutJuridique(value: any) {
        const liste = this.statutJuridiques.filter(type => type.id == value);
        return liste.length != 0 ? liste[0].libelle : value;
    }


    updateItems(information) {
        this.snackbar.openModal( AjoutPersonnePhysiqueComponent, '50rem', 'edit', '', information, information.id, () => {
            this.relod();
        });
    }

    relod(){
        window.location.reload();
    }
    updateItemsMoral(information) {
        this.snackbar.openModal( AjoutPersonneMoraleComponent, '50rem', 'edit', '', information, information.id, () => {
            this.relod();
        });
    }

    updateClient(client): void {
        this.snackbar.openModal( AjoutClientsComponent, '60rem', 'edit', '', client, '', () => {
        });
    }

    ajoutAttributComplementaire(client, listAttributCompl): void {

        this.dialogRef = this._matDialog.open(AjoutAttributComplementaireComponent, {
            autoFocus: true,
            width: '30rem',
            panelClass: 'event-form-dialog',
            data: {
                action: 'new',
                client: client,
                listAttribut: listAttributCompl,
                type: 'CLIENT',
                check: true
            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.getAttributComplementaireClient(this.infosClient);
            }
        });
    }

    updateAttributComplementaire(attribut, client): void {
        this.dialogRef = this._matDialog.open(AjoutAttributComplementaireComponent, {
            autoFocus: true,
            width: '30rem',
            panelClass: 'event-form-dialog',
            data: {
                action: 'edit',
                client: client,
                attribut: attribut,
                type: 'CLIENT',
                check: true
            }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                //window.location.reload();
                this.getAttributComplementaireClient(this.infosClient);
            }
        });
    }

    templateConsentementClient(client): void {

        const data = {
            'clientId': client.id,
            'creditId': null
        };
        this.messageService.templateConsentementClient(data).subscribe((response) => {
            const reponse = response;
            if (reponse['responseCode'] == 200) {
                this.listetemplate = reponse['data']['templateText'];
            }
            this.dialogRef = this._matDialog.open(TemplateConsentementComponent, {
                autoFocus: true,
                width: '50rem',
                panelClass: 'event-form-dialog',
                data: {
                    action: 'edit',
                    client: client,
                    templateClient: this.listetemplate,
                    check: true
                }
            });
            this.dialogRef.afterClosed().subscribe((resp) => {
                if (resp) {

                }
            });
        });
    }

}
