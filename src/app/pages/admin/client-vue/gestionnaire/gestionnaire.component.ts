import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CoreService } from 'app/core/core/core.service';
import { CONSTANTES } from '../../admin/model/constantes';
import { ClientVueService } from '../client-vue.service';

@Component({
    selector       : 'gestionnaire',
    templateUrl    : './gestionnaire.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GestionnaireComponent
{
    accountForm: UntypedFormGroup;
    constantes = CONSTANTES;
    userConnecter: any;

    /**
     * Constructor
     */
    constructor(
        private clientServive: ClientVueService,
        private CoreService: CoreService
    )
    {
        this.userConnecter = this.CoreService.decriptDataToLocalStorage('CD-@--5');
        this.getGestionnaire(this.userConnecter?.id);

    }

    getGestionnaire(idGestionnaire) {
        this.clientServive.getGestionnaire(idGestionnaire).subscribe(() => {

        });
      }

}
