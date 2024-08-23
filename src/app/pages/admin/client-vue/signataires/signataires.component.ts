import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'app/core/core/core.service';
import { CONSTANTES } from '../../admin/model/constantes';
import { ClientVueService } from '../client-vue.service';
import { AjoutSignataireComponent } from './ajout-signataire/ajout-signataire.component';

@Component({
    selector       : 'signataires',
    templateUrl    : './signataires.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignataireComponent implements OnInit
{

    @ViewChild('signataireTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;
    data: any;
    signataireDataSource: MatTableDataSource<any> = new MatTableDataSource();
    signataireColumns: string[] = ['prenom','nom','periodiciteMontantMax','montantMaxAutorise'];
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
       private clientServive: ClientVueService,
       private _matDialog: MatDialog,
       private _changeDetectorRef: ChangeDetectorRef,
       private router: Router,
       private CoreService: CoreService,
       private route: ActivatedRoute
    )
    {
      if(this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state){
        this.data = this.router.getCurrentNavigation().extras.state.extraData.data;
       }

       this.route.params.subscribe((params) => {
        this.paramsId = params['id'];
      });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

    this.getAllSignataire(this.paramsId);


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


    ajoutSignataire(): void {
        this.dialogRef = this._matDialog.open(AjoutSignataireComponent, {
          autoFocus: true,
          width: '43rem',
          panelClass: 'event-form-dialog',
          disableClose: true,
          data: {
            action: 'new',
            clientId: this.paramsId
          }
        });
        this.dialogRef.afterClosed().subscribe((resp) => {
          if (resp) {
            this.getAllSignataire(this.paramsId);
          }
        });
      }

      modifierSignataire(data): void {
        this.dialogRef = this._matDialog.open(AjoutSignataireComponent, {
          autoFocus: true,
          width: '35rem',
          panelClass: 'event-form-dialog',
          disableClose: true,
          data: {
            action: 'edit',
            signataire: data
          }

        });
        this.dialogRef.afterClosed().subscribe((resp) => {
          if (resp) {
          }
        });
      }

      getSignataire() {
        this.isLoading = true;
        this.clientServive.getSignataire(this.pageSize,this.offset).subscribe((resp) => {
          if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
            this.isLoading = false;
            this.signataireDataSource.data = resp[this.constantes.RESPONSE_DATA];
            this._changeDetectorRef.markForCheck();
          } else {
            this.isLoading = false;
          }
        }, (error) => {
          this.isLoading = false;
        });
      }


      getClient(Id) {
        this.isLoading = true;
       this.CoreService.getElement(Id,'client').subscribe((resp) => {
         if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
            this.isLoading = false;
           this.infosClient = resp[this.constantes.RESPONSE_DATA];
           this.signataireDataSource.data = this.infosClient?.signataires;
           this._changeDetectorRef.markForCheck();
         } else {
            this.isLoading = false;
         }
       }, (error) => {
         this.isLoading = false;
       });
     }


     getAllSignataire(clientId) {
      this.isLoading = true;
      this.CoreService.list('signataire-client/' + clientId, this.offset, this.pageSize,).subscribe((resp) => {
        if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
          this.isLoading = false;
           this.signataireDataSource.data = resp[this.constantes.RESPONSE_DATA];
          this._changeDetectorRef.markForCheck();
        } else {
          this.isLoading = false;
        }
      }, (error) => {
        this.isLoading = false;
      });
    }



}
