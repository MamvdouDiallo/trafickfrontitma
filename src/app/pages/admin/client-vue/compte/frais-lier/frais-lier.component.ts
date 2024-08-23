import {Component, Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CONSTANTES} from '../../../admin/model/constantes';


@Component({
  selector: 'frais-lier',
  templateUrl: './frais-lier.component.html',
})
export class FraisLierComponent {
  @Input() fraisLierDataSource: MatTableDataSource<any> = new MatTableDataSource();
  fraisColumns: string[] = ['intituleFrais','montantFrais','dateGeneration','datePaiement','statut'];
  isLoading: boolean = false;
  constantes = CONSTANTES;

  trackByFn(index: number, item: any): any {
        return item.id || index;
  }

}
