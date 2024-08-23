import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {CoreService} from "app/core/core/core.service";



@Component({
    selector: 'app-amortissement',
    templateUrl: './amortissement.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmortissementComponent {
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator)
    set _paginator(value: MatPaginator) {
        if (value !== undefined && this.dataSource) {
            this.dataSource.paginator = value;
        }
    }

    @ViewChild('signataireTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;
    data: any;
    // @Input() compteDataSource: MatTableDataSource<any> = new MatTableDataSource();
    @Input() compteDataSource;
    @Input() capitalTotal;
    @Input() montantEcheanceTotal;
    @Input() interetsTotals;
    @Input() currentCred;

    @Input()
    set tableauAmortissementss(data: any) {
        this.tableauAmortissements = data ? data : [];
    }
    tableauAmortissements: any;
    compteColumns: string[] = ['numero','dateEcheance','montantCapital','montantEcheance','montantInteret'];
    dialogRef: any;
    isLoading: boolean = false;
    offset: number = 0;
    informations: any;
    pageSize: number = 10;
    infosClient: any;
    datas: any = [];
    length: number;
    currentIndex;
    currentStatut;
    creditSelect;
    /**
     * Constructor
     */
    constructor(
        private coreService: CoreService
    ) {
        this.currentStatut = this.coreService.decriptDataToLocalStorage('CD-@--124').statut;
        this.creditSelect = this.coreService.decriptDataToLocalStorage('CD-@--124');
    }
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
