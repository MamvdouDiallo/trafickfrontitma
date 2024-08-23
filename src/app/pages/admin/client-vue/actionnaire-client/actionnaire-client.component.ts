import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {CoreService} from 'app/core/core/core.service';
import {CONSTANTES} from '../../admin/model/constantes';
import {AjoutActionnaireClientComponent} from './ajout-actionnaire-client/ajout-actionnaire-client.component';
import {SnackBarService} from 'app/core/auth/snackBar.service';

@Component({
    selector: 'actionnaire-client',
    templateUrl: './actionnaire-client.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionnaireClientComponent implements OnInit {

    @ViewChild('signataireTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;
    data: any;
    signataireDataSource: MatTableDataSource<any> = new MatTableDataSource();
    signataireColumns: string[] = ['prenom', 'nom', 'fonction', 'nombreAction', 'dateCreated'];
    dialogRef: any;
    isLoading: boolean = false;
    offset: number = 0;
    pageSize: number = 10;
    constantes = CONSTANTES;
    infosClient: any;
    paramsId: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private coreService: CoreService,
        private route: ActivatedRoute,
        private snackbar: SnackBarService
    ) {

    }

    ngOnInit(): void {
        this.getActionnaire();
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

    ajoutActionnaire(): void {
        this.snackbar.openModal(AjoutActionnaireClientComponent, '43rem', 'new', '', '', this.paramsId, () => {
            this.getActionnaire();
        });
    }


    getActionnaire() {
        this.isLoading = true;
        this.route.params.subscribe((params) => {
            this.paramsId = params['id'];
            this.coreService.query('actionnaire', {clientId: params['id']}).subscribe((resp) => {
                if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
                    this.isLoading = false;
                    this.signataireDataSource.data = resp[this.constantes.RESPONSE_DATA];
                    this._changeDetectorRef.markForCheck();
                } else {
                    this.isLoading = false;
                }
            }, () => {
                this.isLoading = false;
            });
        });

    }

}
