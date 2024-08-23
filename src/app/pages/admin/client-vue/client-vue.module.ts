import {NgOptimizedImage, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgModule } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormGeneratorService } from 'app/core/auth/toFormGroup.service';
import { BureauComponent } from 'app/modules/presentation/client-vue/bureau/bureau.component';
import { ClientVueComponent } from 'app/modules/presentation/client-vue/client-vue.component';
import { ClientVueRoutes } from 'app/modules/presentation/client-vue/client-vue.routing';
import { CompteComponent } from 'app/modules/presentation/client-vue/compte/compte.component';
import { SharedModule } from 'app/shared/shared.module';
import * as NgxMaskModule  from 'ngx-mask';
import { ActionnaireClientComponent } from './actionnaire-client/actionnaire-client.component';
import { AjoutActionnaireClientComponent } from './actionnaire-client/ajout-actionnaire-client/ajout-actionnaire-client.component';
import { AjoutCompteComponent } from './compte/ajout-compte/ajout-compte.component';
import { AjoutReservationComponent } from './compte/ajout-reservation/ajout-reservation.component';
import { FraisLierComponent } from './compte/frais-lier/frais-lier.component';
import { AjoutMandataireComponent } from './compte/ajout-mandataire/ajout-mandataire.component';
import { AjoutCreditComponent } from './credit/ajout-credit/ajout-credit.component';
import { AmortissementComponent } from './credit/amortissement/amortissement.component';
import { CreditComponent } from './credit/credit.component';
import { AjoutDepotGarantieComponent } from './credit/depot-garantie/ajout-depot-garantie/ajout-depot-garantie.component';
import { DepotGarantieComponent } from './credit/depot-garantie/depot-garantie.component';
import { FinancerCreditComponent } from './credit/financer-credit/financer-credit.component';
import { FraisLierCreditComponent } from './credit/frais-lier-credit/frais-lier-credit.component';
import { FraisClientComponent } from './frais-client/frais-client.component';
import { GestionnaireComponent } from './gestionnaire/gestionnaire.component';
import { AjouterGroupementComponent } from './groupement/ajouter-groupement/ajouter-groupement.component';
import { GroupementComponent } from './groupement/groupement.component';
import { AjoutAttributComplementaireComponent } from './info-client/ajout-attribut-complementaire/ajout-attribut-complementaire.component';
import { InfoClientComponent } from './info-client/info-client.component';
import { TemplateConsentementComponent } from './info-client/template-consentement/template-consentement.component';
import { AjoutPersonneLieComponent } from './personne-lie/ajout-personne-lie/ajout-personne-lie.component';
import { PersonneLierComponent } from './personne-lie/personne-lie.component';
import { AjoutSignataireComponent } from './signataires/ajout-signataire/ajout-signataire.component';
import { SignataireComponent } from './signataires/signataires.component';
import { SignatureClientComponent } from './signature-client/signature-client.component';
import { SnackBarService } from 'app/core/auth/snackBar.service';
import {AjoutDepotComponent} from "./depot-terme/ajout-depot/ajout-depot.component";
import {DepotTermeComponent} from "./depot-terme/depot-terme.component";
import {MatStepperModule} from "@angular/material/stepper";
import {DetailGarantieComponent} from "./credit/depot-garantie/detail-garantie/detail-garantie.component";
import {MatMenuModule} from "@angular/material/menu";
import {TransfertClientComponent} from "./transfert-client/transfert-client.component";
import {FicheClientComponent} from "./fiche-client/fiche-client.component";
import {DemandeCreditComponent} from "./demande-credit/demande-credit.component";
import {AjoutDemandeCreditComponent} from "./demande-credit/ajout-demande-credit/ajout-demande-credit.component";
import {VirementPermanentVueComponent} from "./virement-permanent/virement-permanent-vue.component";
import {
    AjoutVirementPermanentVueComponent
} from "./virement-permanent/ajout-virement-permanent-vue/ajout-virement-permanent-vue.component";
import {NgxMatIntlTelInputComponent} from "ngx-mat-intl-tel-input-v16";
import {MatPaginatorModule} from "@angular/material/paginator";




export const CUSTOM_MOMENT_FORMATS = {
    parse: {
      dateInput: 'l, LT',
    },
    display: {
      dateInput: 'M/D/YYYY, h:mm A',
      monthYearLabel: 'MMM YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'MMMM YYYY',
    },
  };
registerLocaleData(localeFr, 'fr');


@NgModule({
    declarations: [
        ClientVueComponent,
        CompteComponent,
        BureauComponent,
        SignataireComponent,
        AjoutSignataireComponent,
        GroupementComponent,
        GestionnaireComponent,
        AjouterGroupementComponent,
        ActionnaireClientComponent,
        AjoutActionnaireClientComponent,
        PersonneLierComponent,
        AjoutPersonneLieComponent,
        InfoClientComponent,
        AjoutCompteComponent,
        AjoutReservationComponent,
        CreditComponent,
        DepotGarantieComponent,
        AmortissementComponent,
        AjoutCreditComponent,
        AjoutDepotGarantieComponent,
        DetailGarantieComponent,
        FinancerCreditComponent,
        SignatureClientComponent,
        FraisLierComponent,
        FraisClientComponent,
        FraisLierCreditComponent,
        TemplateConsentementComponent,
        AjoutAttributComplementaireComponent,
        AjoutDepotComponent,
        DepotTermeComponent,
        AjoutMandataireComponent,
        TransfertClientComponent,
        FicheClientComponent,
        DemandeCreditComponent,
        AjoutDemandeCreditComponent,
        VirementPermanentVueComponent,
        AjoutVirementPermanentVueComponent
    ],
    imports: [
        RouterModule.forChild(ClientVueRoutes),
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        FuseAlertModule,
        SharedModule,
        MatTooltipModule,
        FuseCardModule,
        MatTableModule,
        MatExpansionModule,
        MatTabsModule,
        FuseNavigationModule,
        MatToolbarModule,
        MatDialogModule,
        MatMomentDateModule,
        MatDatepickerModule,
        MatProgressSpinnerModule,
        NgxMaskModule.NgxMaskDirective,
        NgSelectModule,
        NgOptimizedImage,
        MatStepperModule,
        MatMenuModule,
        NgxMatIntlTelInputComponent,
        MatPaginatorModule,
    ],
    providers: [
        FormGeneratorService,
        SnackBarService,
        {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
      ],
      exports:[NgxMaskModule.NgxMaskDirective]
})
export class ClientVueModule
{
}
