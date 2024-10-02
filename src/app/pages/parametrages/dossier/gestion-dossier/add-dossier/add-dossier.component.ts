import { ChangeDetectorRef, Component, Inject, ViewChild } from "@angular/core";
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from "@angular/material/dialog";
import { MatDrawer } from "@angular/material/sidenav";
import { MatStepper } from "@angular/material/stepper";
import { LocalService } from "src/app/core/services/local.service";
import { MoService } from "src/app/core/services/mo.service";
import { ServiceParent } from "src/app/core/services/serviceParent";
import { ClientVueService } from "src/app/pages/admin/client-vue/client-vue.service";
import { CoreService } from "src/app/shared/core/core.service";
import { SnackBarService } from "src/app/shared/core/snackBar.service";
import { environment } from "src/environments/environment";
import { AddUserComponent } from "../../../utilisateur/add-user/add-user.component";
import { AngularMaterialModule } from "src/app/shared/angular-materiel-module/angular-materiel-module";
import { Image } from "src/app/shared/models/image.model";

@Component({
  selector: "app-add-dossier",
  standalone: true,
  imports: [AngularMaterialModule],
  templateUrl: "./add-dossier.component.html",
  styleUrl: "./add-dossier.component.css",
})
export class AddDossierComponent {
  panelOpenState = false;
  @ViewChild("drawer") drawer: MatDrawer;
  @ViewChild("stepper") private myStepper: MatStepper;
  dialogTitle: string;
  id: string;
  initForm: UntypedFormGroup;
  labelButton: string;
  suffixe: string = " un utilisateur";
  countries: any;

  pageSize: number = 100;
  pageIndex: number = 0;

  nrSelect;
  situationsMatrimoniales: any;
  typeIdentifications: any = [];
  capaciteJuridiques: any;
  dateDelivrance;
  regimeMatrimoniaux: any;
  professions: any;
  loader: boolean;
  action: string;
  minBirthDay: any;
  today = new Date();
  loaderss = false;
  fields: any;
  canAdd: boolean;
  dataCheck;
  hasPhoneError: boolean;
  currentValue: any;
  countryChange: boolean = false;
  eventNumber: any;
  isFocus: unknown;
  noImage = "";
  errorCNI;
  newDate = new Date();
  emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  isValidOnWhatsApp: boolean = true;
  ng2TelOptions;
  idPiece;
  listeNoire: boolean = false;
  categoriePartieInteresses: any;
  uploadedImage!: File;
  imageURL: string | undefined;
  urlImage = environment.apiURL + "image/getFile/";

  roles: any[] = [];
  categories: any[] = [];
  profils: any[] = [];

  url: string = "documents";

  constructor(
    public matDialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) _data,
    private fb: UntypedFormBuilder,
    private coreService: CoreService,
    private snackbar: SnackBarService,
    private changeDetectorRefs: ChangeDetectorRef,
    private clientService: ClientVueService,
    private moservice: MoService,
    private _matDialog: MatDialog,
    private localService: LocalService,
    private clientServive: ClientVueService,
    private parentService: ServiceParent
  ) {
    this.currentUser = this.localService.getDataJson("user");

    console.log("user connecter", this.currentUser);
    if (_data?.action == "new") {
      this.initForms();
      this.labelButton = "Ajouter ";
    } else if (_data?.action == "edit") {
      this.labelButton = "Modifier ";
      this.imageToff=_data.data.urlDocument;
      this.id = _data.data.id;
      this.initForms(_data.data);
      const imageToEdit = _data.data.image;
      // console.log("is",_data.data.image.type);

      if (imageToEdit) {
        document.querySelectorAll("#member-img").forEach((element: any) => {
          element.src = this.getImageFromBase64(
            imageToEdit.type,
            imageToEdit.image
          );
        });
        const image: any = this.getImageFromBase64(
          imageToEdit.type,
          imageToEdit.image
        );
        const file = this.base64ToFile(image, imageToEdit.name);
        this.uploadedImage = file;
      }
    }

    this.action = _data?.action;
    this.canAdd = _data.canAdd;
    this.dialogTitle = this.labelButton + this.suffixe;
    this.ng2TelOptions = { initialCountry: "sn" };
  }

  checkValidOnWhatsApp(event: any): void {
    const value = event.value;
    this.initForm.get("statutVulnerable")?.setValue(value);
  }

  getImageFromBase64(imageType: string, imageName: number[]): string {
    const base64Representation = "data:" + imageType + ";base64," + imageName;
    return base64Representation;
  }

  base64ToFile(base64String: string, fileName: string): File {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  }

  currentUser: any;
  ngOnInit(): void {
    this.getCategorieItems();
    //this.getFonctions();
   // this.getRole();
  }

  // initForms(donnees?) {
  //   this.initForm = this.fb.group({
  //     lastname: this.fb.control(donnees ? donnees?.lastname : null, [
  //       Validators.required,
  //     ]),
  //     firstname: this.fb.control(donnees ? donnees?.firstname : null, [
  //       Validators.required,
  //     ]),
  //     email: this.fb.control(donnees ? donnees?.email : null, [
  //       Validators.required,
  //       Validators.email,
  //     ]),
  //     locality: this.fb.control(donnees ? donnees?.locality : null, [
  //       Validators.required,
  //     ]),

  //     project_id: this.fb.control(
  //       this.currentUser.projects ? this.currentUser.projects[0]?.id : null,
  //       [Validators.required]
  //     ),

  //     role_id: this.fb.control(donnees ? donnees?.role_id : null, [
  //       Validators.required,
  //     ]),
  //     imageUrl: this.fb.control(donnees ? donnees?.imageUrl : null, [
  //       Validators.required,
  //     ]),
  //     contact: this.fb.control(donnees ? donnees?.contact : null, [
  //       Validators.required,
  //     ]),
  //     categorie_id: this.fb.control(donnees ? donnees?.categorie_id : null, [
  //       Validators.required,
  //     ]),
  //     fonction_id: this.fb.control(donnees ? donnees?.fonction_id : null, [
  //       Validators.required,
  //     ]),
  //   });
  // }


  // initForms(donnees?) {
  //   this.initForm = this.fb.group({
  //     libelle: this.fb.control(donnees ? donnees?.libelle : null, [
  //       Validators.required,
  //     ]),
  //     urlDocument: this.fb.control(donnees ? donnees?.urlDocument : null, [
  //       Validators.required,

  //     ]),
  //     projetId: this.fb.control(donnees ? donnees?.projetId : null, [
  //       Validators.required,
  //     ]),
  //     categorieDocumentId: this.fb.control(donnees ? donnees?.categorieDocumentId : null, [
  //       Validators.required,
  //     ]),
  //   });
  // }

  initForms(donnees?) {
    this.initForm = this.fb.group({
      libelle: this.fb.control(donnees ? donnees?.libelle : null, [
        Validators.required,
      ]),
      urlDocument: this.fb.control(donnees ? this.urlImage + donnees?.urlDocument : this.urlImage, [
        Validators.required,
      ]),
        projetId: this.fb.control(
        this.currentUser.projects ? this.currentUser.projects[0]?.id : null,
        [Validators.required]
      ),

      categorieDocumentId: this.fb.control(donnees ? donnees?.categorieDocumentId : null, [
        Validators.required,
      ]),
    });
  }




  get phoneValue() {
    return this.initForm.controls["numeroTelephonePersonneContact"];
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

  updateItems() {
    console.log(this.initForm.value);
    this.snackbar
      .showConfirmation(`Voulez-vous vraiment modifier ce document `)
      .then((result) => {
        if (result["value"] == true) {
          this.loader = true;
          const value = this.initForm.value;
          this.coreService
            .updateItem(value, this.id, this.url)
            .subscribe(
              (resp) => {
                if (resp) {
                  this.loader = false;
                  this.matDialogRef.close(resp);
                  this.snackbar.openSnackBar(
                    "document  modifié avec succés",
                    "OK",
                    ["mycssSnackbarGreen"]
                  );
                } else {
                  this.loader = false;
                  this.snackbar.openSnackBar(resp["message"], "OK", [
                    "mycssSnackbarRed",
                  ]);
                }
              },
              (error) => {
                this.loader = false;
                this.loader = false;
                this.snackbar.showErrors(error);
              }
            );
        }
      });
  }

  checkRecap(type) {
    if (type == "new") {
      this.addItems();
    } else if (type == "edit") {
      this.updateItems();
    }
  }

  getCategorie(value: any) {
    if (this.categoriePartieInteresses) {
      const liste = this.categoriePartieInteresses.filter(
        (type) => type.id == value
      );
      return liste.length != 0 ? liste[0]?.libelle : value;
    }
  }

  //file sun telecom

  fileSelected;
  loaderImg = false;

  saveFile(file, type, name) {
    let formData = new FormData();
    formData.append("file", file);

    this.loaderImg = true;
    this.changeDetectorRefs.detectChanges();
    const dataFile = { file: file };
    this.clientService.saveStoreFile("store-file", formData).subscribe(
      (resp) => {
        if (resp) {
          console.log("====================================");
          console.log(resp);
          console.log("====================================");
          this.noImage = resp["urlprod"];
          this.initForm.get(name).setValue(this.noImage);
          this.loaderImg = false;
          this.changeDetectorRefs.detectChanges();
          this.snackbar.openSnackBar("Fichier chargé avec succès", "OK", [
            "mycssSnackbarGreen",
          ]);
        }
      },
      (error) => {
        this.loaderImg = false;
        this.snackbar.showErrors(error);
      }
    );
  }

  // Fin file sun telecom

  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];
    this.uploadedImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      document.querySelectorAll("#member-img").forEach((element: any) => {
        element.src = this.imageURL;
      });
    };
    reader.readAsDataURL(file);
  }

  deleteImage() {
    // Logique pour supprimer l'image sélectionnée
    // Par exemple, réinitialisation de l'image à une image par défaut
    document
      .getElementById("member-img")
      .setAttribute("src", "assets/images/users/user-dummy-img.jpg");
    // Réinitialisation de l'input de type fichier pour effacer la sélection
    const inputElement = document.getElementById(
      "member-image-input"
    ) as HTMLInputElement;
    inputElement.value = "";
    this.uploadedImage = null;
  }

  savedocument() {
    if (this.uploadedImage) {
      return this.moservice
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((ima: Image) => {
          this.addItems();
        });
    } else {
      return this.addItems();
    }
  }

  addItems() {
    console.log('====================================');
    this.initForm.get('projetId').setValue(1);
    console.log('====================================');
    this.snackbar
      .showConfirmation(`Voulez-vous vraiment ajouter ce document `)
      .then((result) => {
        if (result["value"] == true) {
          this.loader = true;
         // const value = documentRequest;
          this.coreService.addItem(this.initForm.value, this.url).subscribe(
            (resp) => {
              if (resp["responseCode"] == 201) {
                this.snackbar.openSnackBar(
                  "document  ajouté avec succés",
                  "OK",
                  ["mycssSnackbarGreen"]
                );
                this.loader = false;
                this.matDialogRef.close(resp["data"]);
                this.changeDetectorRefs.markForCheck();
              } else {
                this.loader = false;
                this.changeDetectorRefs.markForCheck();
              }
            },
            (error) => {
              this.loader = false;
              this.changeDetectorRefs.markForCheck();
              this.snackbar.showErrors(error);
            }
          );
        }
      });
  }

  // selectOnFile(evt, type, name) {
  //   let accept = [];
  //   let extension = "";
  //   if (type === "photo_profile") {
  //     accept = [".png", ".PNG", ".jpg", ".JPG"];
  //     extension = "une image";
  //   }
  //   for (const file of evt.target.files) {
  //     const index = file.name.lastIndexOf(".");
  //     const strsubstring = file.name.substring(index, file.name.length);
  //     const ext = strsubstring;
  //     if (accept.indexOf(strsubstring) === -1) {
  //       this.snackbar.openSnackBar(
  //         "Ce fichier " + file.name + " n'est " + extension,
  //         "OK",
  //         ["mycssSnackbarRed"]
  //       );
  //       return;
  //     } else {
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         if (type === "photo_profile") {
  //           const img = new Image();
  //           img.src = e.target.result;
  //           this.saveStoreFile(file);
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }

  // imageToff: any;

  // saveStoreFile(file) {
  //   let formData = new FormData();
  //   formData.append("file", file);
  //   this.changeDetectorRefs.detectChanges();
  //   const dataFile = { file: file };
  //   this.clientServive
  //     .saveStoreFile("image/uploadFileDossier", formData)
  //     .subscribe(
  //       (resp) => {
  //         if (resp) {
  //           console.log(resp);
  //           this.imageToff = `${this.urlImage + resp["data"]}`;
  //           this.initForm.get("imageUrl").setValue(this.imageToff);
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //         this.snackbar.showErrors(error);
  //       }
  //     );
  // }

  // selectOnFile(evt, type, name) {
  //   let accept = [];
  //   let extension = "";
  //   if (type === "photo_profile") {
  //     accept = [".png", ".PNG", ".jpg", ".JPG"];
  //     extension = "une image";
  //   }
  //   for (const file of evt.target.files) {
  //     const index = file.name.lastIndexOf(".");
  //     const strsubstring = file.name.substring(index, file.name.length);
  //     const ext = strsubstring;
  //     if (accept.indexOf(strsubstring) === -1) {
  //       this.snackbar.openSnackBar(
  //         "Ce fichier " + file.name + " n'est " + extension,
  //         "OK",
  //         ["mycssSnackbarRed"]
  //       );
  //       return;
  //     } else {
  //       // recuperation du fichier et conversion en base64
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         if (type === "photo_profile") {
  //           const img = new Image();
  //           img.src = e.target.result;
  //           this.saveStoreFile(file);
  //         }
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }

  imageToff: any;

  // saveStoreFile(file) {
  //   let formData = new FormData();
  //   formData.append("file", file);
  //   this.changeDetectorRefs.detectChanges();
  //   const dataFile = { file: file };
  //   this.clientServive
  //     .saveStoreFile("image/uploadFileDossier", formData)
  //     .subscribe(
  //       (resp) => {
  //         if (resp) {
  //           console.log(resp);
  //           this.imageToff = `${this.urlImage + resp["data"]}`;
  //           this.initForm.get("imageUrl").setValue(this.imageToff);
  //           // Fermez le dialogue et renvoyez l'URL de la signature
  //           // this.matDialogRef.close(signatureUrl);
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //         this.snackbar.showErrors(error);
  //       }
  //     );
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
            this.saveStoreFile(file);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }


  imageProjet:any

  saveStoreFile(file) {
    let formData = new FormData();
    formData.append("file", file);
  //  this._changeDetectorRef.detectChanges();
    const dataFile = { file: file };
    this.clientServive
      .saveStoreFile("image/uploadFileDossier", formData)
      .subscribe(
        (resp) => {
          if (resp) {
            console.log(resp);
            this.imageToff = `${this.urlImage + resp["data"]}`;
             this.imageProjet = `${this.urlImage + resp["data"]}`;
             this.initForm.get('urlDocument').setValue(this.imageProjet);
            // Fermez le dialogue et renvoyez l'URL de la signature
           // this.matDialogRef.close(signatureUrl);
          }
        },
        (error) => {
          console.log(error);
          this.snackbar.showErrors(error);
        }
      );
  }

  // getRole() {
  //   return this.parentService
  //     .list("roles/all", this.pageSize, this.pageIndex)
  //     .subscribe(
  //       (data: any) => {
  //         if (data["responseCode"] == 200) {
  //           this.roles = data["data"];
  //         }
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  // getFonctions() {
  //   return this.parentService
  //     .list("fonctions", this.pageSize, this.pageIndex)
  //     .subscribe(
  //       (data: any) => {
  //         if (data["responseCode"] == 200) {
  //           this.profils = data["data"];
  //         }
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }
  getCategorieItems() {
    return this.parentService
      .list("categorieDocuments", this.pageSize, this.pageIndex)
      .subscribe(
        (data: any) => {
          if (data["responseCode"] == 200) {
            this.categories = data["data"];
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  filteredProfils: any[] = [];

  onCategoryChange(categorieId: number) {
    this.filteredProfils = this.profils.filter(
      (profil) => profil.categorie.id === categorieId
    );
  }
}
