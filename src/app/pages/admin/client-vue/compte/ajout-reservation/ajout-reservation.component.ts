import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CONSTANTES} from '../../../admin/model/constantes';
import { CoreService } from 'app/core/core/core.service';
import { SnackBarService } from 'app/core/auth/snackBar.service';

@Component({
  selector: 'app-ajout-reservation',
  templateUrl: './ajout-reservation.component.html',
  styleUrls: ['./ajout-reservation.component.scss']
})
export class AjoutReservationComponent implements OnInit {
  dialogTitle: string;
  action: string;
  initForm: any;
  constantes = CONSTANTES;
  compteId;
  labelButton: string;
  loader: boolean;
  url: string = 'reserver-fonds';
  id;
  information;
  constructor(private formBuilder: UntypedFormBuilder,
              private CoreService: CoreService,
              public matDialogRef: MatDialogRef<AjoutReservationComponent>,
              @Inject(MAT_DIALOG_DATA) _data,
              private _changeDetectorRef: ChangeDetectorRef,
              private snackbar: SnackBarService
              ) {
      // Set the defaults
      this.action = _data.action;
      this.compteId = _data?.dataOther;
      this.id = _data.id;
      if (this.action === this.constantes.TYPEACTION.EDIT) {
          this.dialogTitle = 'Modifier une réservation de fond';
          this.labelButton = 'Modifier';
          this.information = _data?.information;
      } else if (this.action === this.constantes.TYPEACTION.NEW) {
          this.dialogTitle = 'Ajouter une réservation de fond';
          this.labelButton = 'Ajouter';
      }
  }

  ngOnInit(): void {
      this.initializeForm();
      if (this.action === this.constantes.TYPEACTION.EDIT) {
          this.initForm.patchValue(this.information);
      }
  }
  initializeForm(){
      this.initForm = this.formBuilder.group({
          compte : this.formBuilder.control(this.compteId,),
          montant : this.formBuilder.control(null,[Validators.required]),
          motif : this.formBuilder.control(null,[Validators.required]),
      });
  }
  checkValidity(g: UntypedFormGroup) {
        Object.keys(g.controls).forEach((key) => {
            g.get(key).markAsDirty();
        });
        Object.keys(g.controls).forEach((key) => {
            g.get(key).markAsTouched();
        });
        Object.keys(g.controls).forEach((key) => {
            g.get(key).updateValueAndValidity();
        });
    }
  addItems() {
    this.snackbar.showConfirmation('Voulez-vous vraiment faire une réservation de fond ?').then((result) => {
            if (result['value'] == true) {
                this.loader = true;
                const value = this.initForm.value;
                value.montant = Number(value?.montant);

                this.CoreService.addItem(value, 'reserver-fonds').subscribe(
                    (resp) => {
                        if (resp) {
                            this.loader = false;
                            this.matDialogRef.close(resp);
                            this._changeDetectorRef.markForCheck();
                            this.snackbar.openSnackBar('Réservation ajoutée avec succés', 'OK',['mycssSnackbarGreen']);
                        } else {
                            this.loader = false;
                            this._changeDetectorRef.markForCheck();
                            this.snackbar.openSnackBar(resp['cause']['message'], 'OK',['mycssSnackbarRed']);
                        }
                    },
                    (error) => {
                        this.loader = false;
                        this.loader = false;
                        this.snackbar.showErrors(error);
                        this._changeDetectorRef.markForCheck();
                    });
            }
        });

    }
  updateItems() {
        this.snackbar.showConfirmation('Voulez-vous vraiment modifier cette réservation ?').then((result) => {
            if (result['value'] == true) {
                this.loader = true;
                const value = this.initForm.value;
                this.CoreService.updateItem(value, this.id, this.url).subscribe(
                    (resp) => {
                        if (resp) {
                            this.loader = false;
                            this.matDialogRef.close(resp);
                            this.snackbar.openSnackBar('Réservation modifiée avec succés', 'OK',['mycssSnackbarGreen']);
                        } else {
                            this.loader = false;
                            this.snackbar.openSnackBar(resp['message'], 'OK',['mycssSnackbarRed']);
                        }
                    },
                    (error) => {
                        this.loader = false;
                        this.loader = false;
                        this.snackbar.showErrors(error);
                    });
            }
        });

    }
  checkRecap(type) {
      if (this.initForm.invalid) {
          this.checkValidity(this.initForm);
      } else {
         if (type == 'new') {
             this.addItems();
        } else if (type == 'edit') {
             this.updateItems();
        }
      }
  }
}
