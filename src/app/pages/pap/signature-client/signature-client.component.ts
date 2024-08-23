import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { SnackBarService } from 'src/app/shared/core/snackBar.service';
import { CONSTANTES } from 'src/app/shared/models/constantes';
import { ClientVueService } from '../../admin/client-vue/client-vue.service';
import { AngularMaterialModule } from 'src/app/shared/angular-materiel-module/angular-materiel-module';
import { environment } from 'src/environments/environment';



@Component({
    selector: 'signature-client',
    templateUrl: './signature-client.component.html',
    standalone: true,
    imports:[AngularMaterialModule],
    styleUrls: ['./signature-client.component.scss']
})
export class SignatureClientComponent {
    isLoading: boolean = false;
    action: string;
    dialogTitle: string = 'Signature du Pap';
    constantes = CONSTANTES;
    signature = '';
    loaderImg: boolean = false;
    infosPap: any;
    noImage;
    urlImage=    environment.apiURL+'image/getFile/';

    constructor(
        public matDialogRef: MatDialogRef<SignatureClientComponent>, @Inject(MAT_DIALOG_DATA) _data,
        private snackbar: SnackBarService,
        private clientServive: ClientVueService,
        private _changeDetectorRef: ChangeDetectorRef,
        private clientService: ClientVueService
    ) {
        this.infosPap = _data.pap;
        console.log(this.infosPap);
        if (this.infosPap.signaturePath != null) {
            this.signature = `${this.urlImage+this.infosPap.signaturePath}`;
        } else {
            this.signature = 'assets/images/noImage.png';
        }
        console.log(_data);

    }

    // selectOnFile(evt) {
    //     let accept = [];
    //     let extension = '';

    //     for (const file of evt.target.files) {
    //         const index = file.name.lastIndexOf('.');
    //         const strsubstring = file.name.substring(index, file.name.length);
    //         const ext = strsubstring;
    //         // Verification de l'extension du fichier est valide
    //         if (accept.indexOf(strsubstring) === -1) {
    //             this.snackbar.openSnackBar('Ce fichier ' + file.name + ' n\'est ' + extension, 'OK', ['mycssSnackbarRed']);
    //             return;
    //         } else {
    //             // recuperation du fichier et conversion en base64
    //             const reader = new FileReader();
    //             reader.onload = (e: any) => {
    //                 {
    //                     const img = new Image();
    //                     img.src = e.target.result;
    //                     img.onload = () => {
    //                         const docBase64Path = e.target.result;
    //                         if (ext === '.png' || ext === '.PNG' || ext === '.jpg' || ext === '.JPG' || ext === '.jpeg' || ext === '.JPEG') {
    //                             this.signature = docBase64Path;
    //                             this._changeDetectorRef.detectChanges();
    //                             this.saveStoreFile(file);
    //                         }
    //                     };
    //                 }
    //             };
    //             reader.readAsDataURL(file);
    //         }
    //     }

    // }

    // saveStoreFile(file) {
    //     let formData = new FormData();
    //     formData.append('file', file);
    //     this._changeDetectorRef.detectChanges();
    //     const dataFile = {'file': file};
    //     this.clientService.saveStoreFile('store-file', formData).subscribe((resp) => {
    //         if (resp) {
    //             this.noImage = resp['urlprod'];
    //             this.saveFile(this.noImage);
    //             this._changeDetectorRef.detectChanges();
    //         }
    //     }, (error) => {
    //         this.snackbar.showErrors(error);
    //     });
    // }

    // saveFile(file) {
    //     this.loaderImg = true;
    //     const dataFile =
    //         {'signature': file};
    //     this.clientServive.updateSignature(this.infosPap?.id, dataFile).subscribe((resp) => {
    //         if (resp[this.constantes.RESPONSE_CODE] === this.constantes.HTTP_STATUS.SUCCESSFUL) {
    //             this.signature = resp[this.constantes.RESPONSE_DATA]['signature'];
    //             this.loaderImg = false;
    //             this._changeDetectorRef.detectChanges();
    //             this.snackbar.openSnackBar('Fichier chargée avec succès', 'OK', ['mycssSnackbarGreen']);
    //         }
    //     }, (error) => {
    //         this.loaderImg = false;
    //         this.snackbar.showErrors(error);
    //     });
    // }


    selectOnFile(evt, type, name) {
      let accept = [];
      let extension = "";
      if (type === "photo_profile") {
        accept = [".png", ".PNG", ".jpg", ".JPG"];
        extension = "une image";
      }
      for (const file of evt.target.files) {
        const index = file.name.lastIndexOf(".");
        const strsubstring = file.name.substring(index, file.name.length);
        const ext = strsubstring;
        // Verification de l'extension du ficihier est valide
        if (accept.indexOf(strsubstring) === -1) {
          this.snackbar.openSnackBar(
            "Ce fichier " + file.name + " n'est " + extension,
            "OK",
            ["mycssSnackbarRed"]
          );
          return;
        } else {
          // recuperation du fichier et conversion en base64
          const reader = new FileReader();
          reader.onload = (e: any) => {
            if (type === "photo_profile") {
              const img = new Image();
              img.src = e.target.result;

              img.onload = () => {
                const docBase64Path = e.target.result;

                if (
                  ext === ".png" ||
                  ext === ".PNG" ||
                  ext === ".jpg" ||
                  ext === ".JPG" ||
                  ext === ".jpeg" ||
                  ext === ".JPEG"
                ) {
                  this.saveStoreFile(file);
                }
              };
            }
          };
          reader.readAsDataURL(file);
        }
      }
    }


    saveStoreFile(file) {
      let formData = new FormData();
      formData.append("file", file);
      this._changeDetectorRef.detectChanges();
      const dataFile = { file: file };
      this.clientServive.saveStoreFile("image/uploadFileDossier", formData).subscribe(
        (resp) => {
          if (resp) {
          console.log(resp);
          this.signature =   `${this.urlImage+resp["data"]}`;
           console.log( this.signature);
          this.saveFile(resp["data"]);
            this._changeDetectorRef.detectChanges();
          }
        },
        (error) => {
          console.log(error);

          this.snackbar.showErrors(error);
        }
      );
    }



    saveFile(file) {
      this.loaderImg = true;
      this._changeDetectorRef.detectChanges();
      this.clientServive.updateEntity("personneAffectes/addSignature" ,this.infosPap.id, file).subscribe(
        (resp) => {
          console.log((resp["data"][0]));
       //   this.noImage =  `${this.urlImage+(resp["data"][0].imagePath)}`;
          this.loaderImg = false;
          this._changeDetectorRef.detectChanges();
          this.snackbar.openSnackBar("Fichier chargée avec succès", "OK", [
            "mycssSnackbarGreen",
          ]);
        },
        (error) => {
          console.log(error);

          this.loaderImg = false;
          this.snackbar.showErrors(error);
        }
      );
    }


}
