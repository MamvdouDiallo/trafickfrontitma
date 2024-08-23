import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'app/core/core/core.service';
import { CONSTANTES } from '../../admin/model/constantes';
import {MatPaginator} from '@angular/material/paginator';

@Component({
    selector       : 'frais-client',
    templateUrl    : './frais-client.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FraisClientComponent
{
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('FraiClientTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;
    data: any;
    fraisClientDataSource: MatTableDataSource<any> = new MatTableDataSource();
    fraisColumns: string[] = ['libelle','montantFrais','typePaiementFrais','dateGeneration','datePaiement','statut'];
    dialogRef: any;
    isLoading: boolean = false;
    offset: number = 0;
    pageSize: number = 10;
    constantes = CONSTANTES;
    infosClient: any;
    paramsId: any;
    datas: any = [];
    length: number;
    pageSizeOptions = [5, 10, 25, 100, 500, 1000];
    pageIndex: number = 0;



    /**
     * Constructor
     */
    constructor(
       private _changeDetectorRef: ChangeDetectorRef,
       private router: Router,
       private coreService: CoreService,
       private route: ActivatedRoute
    )
    {
      if(this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state){
        this.data = this.router.getCurrentNavigation().extras.state.extraData.data;
       }

       this.route.params.subscribe((params) => {
        this.paramsId = params['id'];
      });
      this.getFraisClient(this.paramsId);
    }
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

    getFraisClient(clientId) {
      this.isLoading = true;
      this.coreService.list('frais-client-list/' + clientId,this.offset,this.pageSize,).subscribe((resp) => {
        if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
          this.isLoading = false;
           this.fraisClientDataSource.data = resp[this.constantes.RESPONSE_DATA].filter(item => item?.client?.id == this.paramsId);
          // this.fraisClientDataSource.data = resp[this.constantes.RESPONSE_DATA].filter(item => item?.client?.id == this.paramsId && item.statut == this.constantes.STATUS.NON_PAYE);
           this.datas = resp[this.constantes.RESPONSE_DATA].filter(item => item?.client?.id == this.paramsId);
           this.length = this.datas.length;
          this._changeDetectorRef.markForCheck();
        } else {
          this.isLoading = false;
        }
      }, (error) => {
        this.isLoading = false;
      });
    }
    pageChanged(event) {
      //  this.datas = [];
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
        this.offset = this.pageIndex * this.pageSize;
        this.getFraisClient(this.paramsId);
    }



}
