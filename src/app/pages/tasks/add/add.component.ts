import { ChangeDetectorRef, Component, Inject, ViewChild } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatDrawer } from "@angular/material/sidenav";
import { MatStepper } from "@angular/material/stepper";
import { AngularMaterialModule } from "src/app/shared/angular-materiel-module/angular-materiel-module";
import { CoreService } from "src/app/shared/core/core.service";
import { SnackBarService } from "src/app/shared/core/snackBar.service";
import { ClientVueService } from "../../admin/client-vue/client-vue.service";
import { Image } from "src/app/shared/models/image.model";
import { MoService } from "src/app/core/services/mo.service";
import { ResponseData } from "../../projects/project.model";
import { LocalService } from "src/app/core/services/local.service";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrl: "./add.component.css",
  standalone: true,
  imports: [AngularMaterialModule],
})
export class AddComponent {
  panelOpenState = false;
  @ViewChild("drawer") drawer: MatDrawer;
  @ViewChild("stepper") private myStepper: MatStepper;
  dialogTitle: string;
  id: string;
  initForm: UntypedFormGroup;
  labelButton: string;
  suffixe: string = " un consultant";
  countries: any;

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
  url = "users/createConsultant";
  hasPhoneError: boolean;
  currentValue: any;
  countryChange: boolean = false;
  eventNumber: any;
  isFocus: unknown;
  noImage = '';
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

  constructor(

    public matDialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) _data,
    private fb: UntypedFormBuilder,
    private coreService: CoreService,
    private snackbar: SnackBarService,
    private changeDetectorRefs: ChangeDetectorRef,
    private clientService: ClientVueService,
    private moservice: MoService,
    private _matDialog: MatDialog,
    private localService: LocalService
  ) {
    this.currentUser=this.localService.getDataJson("user");



   // console.log("user connecter",this.currentUser)
    if (_data?.action == "new") {
      this.initForms();
      this.labelButton = "Ajouter ";
    } else if (_data?.action == "edit") {
      this.labelButton = "Modifier ";
      this.id = _data.data.id;
      this.initForms(_data.data);
      const imageToEdit = _data.data.image
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


   currentUser :any

  ngOnInit(): void {


  }

  initForms(donnees?) {
    this.initForm = this.fb.group({
      libelle: this.fb.control(donnees ? donnees?.libelle : null, [
        Validators.required,
      ]),
      firstname: this.fb.control(donnees ? donnees?.firstname : null, [
        Validators.required,
      ]),
      email: this.fb.control(donnees ? donnees?.email : null, [
        Validators.required,Validators.email
      ]),
      locality: this.fb.control(donnees ? donnees?.locality : null, [
        Validators.required,
      ]),
      date_of_birth: this.fb.control(donnees ? donnees?.date_of_birth : null, [
        Validators.required,
      ]),
      place_of_birth: this.fb.control(
        donnees ? donnees?.place_of_birth : null,
        [Validators.required]
      ),
      project_id: this.fb.control(this.currentUser.projects ? this.currentUser.projects[0]?.id   : null, [
        Validators.required,
      ]),
      contact: this.fb.control(donnees ? donnees?.contact : null, [
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
      .showConfirmation(
        `Voulez-vous vraiment modifier ce consultant `
      )
      .then((result) => {
        if (result["value"] == true) {
          this.loader = true;
          const value = this.initForm.value;
          this.coreService.updateItem(value, this.id, "users/updateConsultant").subscribe(
            (resp) => {
              if (resp) {
                this.loader = false;
                this.matDialogRef.close(resp);
                this.snackbar.openSnackBar(
                   "Consultant  modifié avec succés",
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
        this.saveConsultant();
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
  formData.append('file', file);

  this.loaderImg = true;
  this.changeDetectorRefs.detectChanges();
  const dataFile = {'file': file};
  this.clientService.saveStoreFile('store-file', formData).subscribe((resp) => {
      if (resp) {
          this.noImage = resp['urlprod'];
          this.initForm.get(name).setValue(this.noImage);
          this.loaderImg = false;
          this.changeDetectorRefs.detectChanges();
          this.snackbar.openSnackBar('Fichier chargé avec succès', 'OK', ['mycssSnackbarGreen']);
      }
  }, (error) => {
      this.loaderImg = false;
      this.snackbar.showErrors(error);
  });
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













saveConsultant() {
    if (this.uploadedImage) {
      return this.moservice
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((ima: Image) => {
          this.addItems(ima);
        });
    } else {
      return this.addItems();
    }
}







addItems(image?: Image) {
  console.log(this.initForm.value);
  const consultantRequest = this.initForm.value;
  if (image) {
    consultantRequest.image = image;
  }
     this.snackbar
       .showConfirmation(
         `Voulez-vous vraiment ajouter ce consultant ` )
       .then((result) => {
         if (result["value"] == true) {
           this.loader = true;
           const value = consultantRequest;
           this.coreService.addItem(value, "users/createConsultant").subscribe(
             (resp) => {
               if (resp["status"] == 200) {
                 this.snackbar.openSnackBar("Consultant  ajouté avec succés", "OK", [
                   "mycssSnackbarGreen",
                 ]);
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



  //  editUser(id: any) {
  //   this.submitted = false;
  //   this.newContactModal?.show();
  //   var modelTitle = document.querySelector(".modal-title") as HTMLAreaElement;
  //   modelTitle.innerHTML = "Edit Profile";
  //   var updateBtn = document.getElementById(
  //     "addContact-btn"
  //   ) as HTMLAreaElement;
  //   updateBtn.innerHTML = "Update";
  //   this.createMoForm.patchValue(this.listMo[id]);



  //   this.selectedProjects = this.listMo[id].projects;

  //   console.log(this.selectedProjects);
  //   this.updateSelectedProjects();
  // }



}
