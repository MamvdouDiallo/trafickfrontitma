import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'app/core/core/core.service';
import { CONSTANTES } from '../../admin/model/constantes';
import { AjouterGroupementComponent } from './ajouter-groupement/ajouter-groupement.component';


@Component({
    selector       : 'groupement',
    templateUrl    : './groupement.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupementComponent implements OnInit
{

    @ViewChild('signataireTable', {read: MatSort}) recentTransactionsTableMatSort: MatSort;
    data: any;
    signataireDataSource: MatTableDataSource<any> = new MatTableDataSource();
    signataireColumns: string[] = ['prenom', 'nom','telephone','fonction'];
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
       private _matDialog: MatDialog,
       private _changeDetectorRef: ChangeDetectorRef,
       private CoreService: CoreService,
       private route: ActivatedRoute
    )
    {
      this.route.params.subscribe((params) => {
        this.paramsId = params['id'];
      });
    }

    /**
     * On init
     */
    ngOnInit(): void
    {
    this.getMembreGroupement(this.paramsId);
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


    ajoutGroupement(): void {
        this.dialogRef = this._matDialog.open(AjouterGroupementComponent, {
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
            this.getMembreGroupement(this.paramsId);
          }
        });
      }

      modifierSignataire(data): void {
        this.dialogRef = this._matDialog.open(AjouterGroupementComponent, {
          autoFocus: true,
          width: '35rem',
          panelClass: 'event-form-dialog',
          disableClose: true,
          data: {
            action: 'edit',
            signataire: data
          }

        });
          if (this.dialogRef && this.dialogRef.afterClosed) {
              this.dialogRef.afterClosed().subscribe((resp) => {
                  if (resp) {
                      this.getMembreGroupement(this.paramsId);
                  }
              });
          }
      }


      getClient(Id) {
        this.isLoading = true;
       this.CoreService.getElement(Id,'client').subscribe((resp) => {
         if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
            this.isLoading = false;
           this.infosClient = resp[this.constantes.RESPONSE_DATA];
           this.signataireDataSource.data = this.infosClient?.membresGroupements;
           this._changeDetectorRef.markForCheck();
         } else {
            this.isLoading = false;
         }
       }, (error) => {
         this.isLoading = false;
       });
     }


     getMembreGroupement(clientId) {
      this.isLoading = true;
      this.CoreService.list('membres-groupement-client/'+clientId,this.offset,this.pageSize,).subscribe((resp) => {
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
