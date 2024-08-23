import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientVueService } from '../client-vue.service';


@Component({
    selector       : 'bureau',
    templateUrl    : './bureau.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BureauComponent implements OnInit
{

    @ViewChild('bureauTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;
    data: any;
    bureauDataSource: MatTableDataSource<any> = new MatTableDataSource();
    bureauColumns: string[] = ['code', 'libelle','action'];
    /**
     * Constructor
     */
    constructor(
       private clientServive: ClientVueService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
     // Get the data


     this.bureauDataSource.data = this.clientServive.getDataBureau();

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
