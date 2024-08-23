import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
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
import * as moment from "moment";
import { CoreService } from "src/app/shared/core/core.service";
import { SnackBarService } from "src/app/shared/core/snackBar.service";
import { AngularMaterialModule } from "src/app/shared/angular-materiel-module/angular-materiel-module";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { DatePipe } from "@angular/common";
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
} from "@angular/material/core";
import { LocalService } from "src/app/core/services/local.service";
import { MatDatepickerModule } from "@angular/material/datepicker";

@Component({
  selector: "app-pap-add",
  templateUrl: "./pap-add.component.html",
  styleUrl: "./pap-add.component.css",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    AngularMaterialModule,
    MatDatepickerModule,
    MatNativeDateModule, //
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MatPaginatorIntl },
    SnackBarService,
    MatDatepickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PapAddComponent  {
  panelOpenState = false;
  @ViewChild("drawer") drawer: MatDrawer;
  @ViewChild("stepper") private myStepper: MatStepper;
  dialogTitle: string;
  id: string;
  initForm: UntypedFormGroup;
  labelButton: string;
  suffixe: string = " une personne affectée";
  countries: any;
  categories: any[] = [
    { id: "1", libelle: "Agricole" },
    { id: "2", libelle: "Miniere" },
  ];
  sexe = [
    { id: "1", value: "Masculin" },
    { id: "2", value: "Feminin" },
  ];
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
  fields: any;
  canAdd: boolean;
  dataCheck;
  url = "personneAffectes";
  hasPhoneError: boolean;
  currentValue: any;
  countryChange: boolean = false;
  eventNumber: any;
  isFocus: unknown;
  errorCNI;
  newDate = new Date();
  emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  isValidOnWhatsApp: boolean = true;
  ng2TelOptions;
  idPiece;
  listeNoire: boolean = false;
  currentUser: any;

  constructor(
    public matDialogRef: MatDialogRef<PapAddComponent>,
    @Inject(MAT_DIALOG_DATA) _data,
    private fb: UntypedFormBuilder,
    private coreService: CoreService,
    private snackbar: SnackBarService,
    private changeDetectorRefs: ChangeDetectorRef,
    private localService: LocalService
  ) {
    this.currentUser=this.localService.getDataJson("user");

    console.log("user connecter",this.currentUser)
    console.log("==data fomrmr==================================");
    console.log(_data.data.pays);
    console.log("====================================");
    if (_data?.action == "new") {
      this.initForms();
      this.labelButton = "Ajouter ";
    } else if (_data?.action == "edit") {
      this.labelButton = "Modifier ";
      this.id = _data.data.id;
      this.initForms(_data.data);
      console.log(_data.data);
        this.initForm.get("sexe").setValue(_data.data.sexe);
      const selectedCountry = _data.data.pays;
      this.checkCNI();
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



  goToStep(index) {
    this.myStepper.selectedIndex = index;
  }

  initForms(donnees?) {
    this.initForm = this.fb.group({
      prenom: this.fb.control(donnees ? donnees?.prenom : null, [
        Validators.required,
      ]),
      nom: this.fb.control(donnees ? donnees?.nom : null, [
        Validators.required,
      ]),
      dateNaissance: this.fb.control(donnees ? donnees?.dateNaissance : null, [
        Validators.required,
      ]),
      lieuNaissance: this.fb.control(donnees ? donnees?.lieuNaissance : null, [
        Validators.required,
      ]),
      pays: this.fb.control(donnees ? donnees?.pays : null, [
        Validators.required,
      ]),
      nationalite: this.fb.control(donnees ? donnees?.nationalite : null, [
        Validators.required,
      ]),
      categorie: this.fb.control(donnees ? donnees?.categorie : null, [
        Validators.required,
      ]),
      age: this.fb.control(donnees ? donnees?.age : null, [
        Validators.required,
      ]),
      sexe: this.fb.control(donnees ? donnees?.sexe : null, [
        Validators.required,
      ]),
      situationMatrimoniale: this.fb.control(
        donnees ? donnees?.situationMatrimoniale : null,
        [Validators.required]
      ),
      idPap: this.fb.control(donnees ? donnees?.idPap : null, [
        Validators.required,
      ]),
      typeIdentification: this.fb.control(
        donnees ? donnees?.typeIdentification : null,
        [Validators.required]
      ),
      numeroIdentification: this.fb.control(
        donnees ? donnees?.numeroIdentification : null,
        [Validators.required]
      ),
      statutPap: this.fb.control(donnees ? donnees?.statutPap : null, [
        Validators.required,
      ]),

      prenomMere: this.fb.control(donnees ? donnees?.prenomMere : null, [
        Validators.required,
      ]),
      prenomPere: this.fb.control(donnees ? donnees?.prenomPere : null, [
        Validators.required,
      ]),

      nomExploitant: this.fb.control(donnees ? donnees?.nomExploitant : null, [
        Validators.required,
      ]),
      prenomExploitant: this.fb.control(
        donnees ? donnees?.prenomExploitant : null,
        [Validators.required]
      ),
      localiteResidence: this.fb.control(
        donnees ? donnees?.localiteResidence : null,
        [Validators.required]
      ),
      departement: this.fb.control(donnees ? donnees?.departement : null, [
        Validators.required,
      ]),
      region: this.fb.control(donnees ? donnees?.region : null, [
        Validators.required,
      ]),
      adresse: this.fb.control(donnees ? donnees?.adresse : null, [
        Validators.required,
      ]),
      numeroTelephone: this.fb.control(
        donnees ? donnees?.numeroTelephone : null,
        [Validators.required]
      ),
      superficieCultive: this.fb.control(
        donnees ? donnees?.superficieCultive : null,
        [Validators.required]
      ),
      superficieAffecte: this.fb.control(
        donnees ? donnees?.superficieAffecte : null,
        [Validators.required]
      ),

      statutVulnerable: this.fb.control(
        donnees ? donnees?.statutVulnerable : null
      ),

      descriptionBienAffecte: this.fb.control(
        donnees ? donnees?.descriptionBienAffecte : null,
        [Validators.required]
      ),
      nombreParcelle: this.fb.control(
        donnees ? donnees?.nombreParcelle : null,
        [Validators.required]
      ),
      idParcelle: this.fb.control(donnees ? donnees?.idParcelle : null, [
        Validators.required,
      ]),
      typeEquipement: this.fb.control(
        donnees ? donnees?.typeEquipement : null,
        [Validators.required]
      ),
      project_id: this.fb.control(this.currentUser.projects ? this.currentUser.projects[0]?.id   : null, [
        Validators.required,
      ]),
    });
  }

  refresh(): void {
    this.initForm.get("numeroIdentification").setValue(null);
    this.initForm.get("dateDelivrancePiece").setValue(null);
    this.initForm.get("dateValiditePiece").setValue(null);
  }
  checkCNI() {
    this.errorCNI = "";
    const fieldCNI = "numeroIdentification";
    if (
      this.initForm.get(fieldCNI).value &&
      this.initForm.get("typeIdentification").value
    ) {
      const cni = this.initForm.get(fieldCNI).value.toString();
      const taille = cni.length;
      const type = this.initForm.get("typeIdentification").value;
      const nombreCaractereMin = this.typeIdentifications.find(
        (piece) => piece?.id == type
      )?.nombreCaractereMin;
      const nombreCaractereMax = this.typeIdentifications.find(
        (piece) => piece?.id == type
      )?.nombreCaractereMax;
      if (taille < nombreCaractereMin || taille > nombreCaractereMax) {
        this.errorCNI = `Le numéro de pièce doit contenir ${nombreCaractereMin} ou ${nombreCaractereMax} caractères`;
      }
    }
  }

  get phoneValue() {
    return this.initForm.controls["numeroTelephonePersonneContact"];
  }

  getNationalite(value: any) {
    if (this.countries) {
      const liste = this.countries.filter((type) => type.id == value);
      return liste.length != 0 ? liste[0]?.nationalite : value;
    }
  }

  getsituationMatrimoniale(value: any) {
    if (this.situationsMatrimoniales) {
      const liste = this.situationsMatrimoniales.filter(
        (type) => type.id == value
      );
      return liste.length != 0 ? liste[0]?.libelle : value;
    }
  }

  getcapaciteJuridique(value: any) {
    if (this.capaciteJuridiques) {
      const liste = this.capaciteJuridiques.filter((type) => type.id == value);
      return liste.length != 0 ? liste[0]?.libelle : value;
    }
  }

  getpays(value: any) {
    if (this.countries) {
      const liste = this.countries.filter((type) => type.id == value);
      return liste.length != 0 ? liste[0]?.nom : value;
    }
  }

  gettypeIdentification(value: any) {
    if (this.typeIdentifications) {
      const liste = this.typeIdentifications.filter((type) => type.id == value);
      return liste.length != 0 ? liste[0]?.libelle : value;
    }
  }

  firstStep() {
    if (
      this.initForm.get("prenom").invalid ||
      this.initForm.get("nom").invalid ||
      this.initForm.get("dateNaissance").invalid ||
      this.initForm.get("lieuNaissance").invalid ||
      this.initForm.get("departementNaissance").invalid ||
      this.initForm.get("pays").invalid ||
      this.initForm.get("nationalite").invalid ||
      this.initForm.get("situationMatrimoniale").invalid ||
      this.initForm.get("capaciteJuridique").invalid ||
      this.initForm.get("nonVoyant").invalid ||
      this.initForm.get("illettre").invalid ||
      this.initForm.get("descriptionBienAffecte").invalid
    ) {
      return false;
    } else {
      return true;
    }
  }

  secondStep() {
    if (
      this.initForm.get("typeIdentification").invalid ||
      this.initForm.get("numeroIdentification").invalid ||
      this.initForm.get("dateDelivrancePiece").invalid ||
      this.initForm.get("dateValiditePiece").invalid ||
      this.initForm.get("paysDelivrancePiece").invalid ||
      this.initForm.get("lieuDelivrancePiece").invalid ||
      this.initForm.get("prenomPere").invalid ||
      this.initForm.get("prenomMere").invalid ||
      this.initForm.get("nomMere").invalid ||
      this.initForm.get("prenomPersonneContact").invalid ||
      this.initForm.get("nomPersonneContact").invalid ||
      this.initForm.get("emailPersonneContact").invalid ||
      this.initForm.get("numeroTelephonePersonneContact").invalid
    ) {
      return false;
    } else {
      return true;
    }
  }

  getListPays() {
    this.coreService.list("pays", 0, 10000).subscribe((response) => {
      if (response["responseCode"] === 200) {
        this.countries = response["data"];
        console.log("countries", this.countries);

        this.nrSelect = response["data"]
          .filter((el) => el.codeAlpha2 == "SN" || el.codeAlpha2 == "SEN")
          .map((e) => e.id)[0];
        this.initForm.get("pays").setValue(this.nrSelect);
       // this.initForm.get("nationalite").setValue(this.nrSelect);
        // this.initForm.get("paysDelivrancePiece").setValue(this.nrSelect);
        //this.initForm.get("localiteResidence").setValue(this.nrSelect);

        this.changeDetectorRefs.markForCheck();
      }
    });
  }

  getListSituationsMatrimoniales() {
    this.coreService
      .list("situation-matrimoniale", 0, 10000)
      .subscribe((response) => {
        console.log(response);
        // alert("Please select")

        if (response["responseCode"] === 200) {
          this.situationsMatrimoniales = response["data"];
          this.changeDetectorRefs.markForCheck();
        }
      });
  }

  getRegimeBySituation(situation) {
    if (situation) {
      this.regimeMatrimoniaux = situation.regimesMatrimonials;
    }
  }

  getListtypeIdentifications() {
    this.coreService.list("nature-piece", 0, 10000).subscribe((response) => {
      if (response["responseCode"] === 200) {
        this.typeIdentifications = response["data"];
        this.changeDetectorRefs.markForCheck();
      }
    });
  }

  getListCapaciteJuridiques() {
    this.coreService
      .list("capacite-juridique", 0, 10000)
      .subscribe((response) => {
        if (response["responseCode"] === 200) {
          this.capaciteJuridiques = response["data"];
          this.changeDetectorRefs.markForCheck();
        }
      });
  }

  getListProfession() {
    this.coreService.list("profession", 0, 10000).subscribe((response) => {
      if (response) {
        this.professions = response["data"];
        this.changeDetectorRefs.markForCheck();
      }
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

  listNoire(event?) {
    this.listeNoire = true;
    const montant = 0;
    const compte = 0;
    this.changeDetectorRefs.markForCheck();
    const data = {
      compte: compte,
      montant: montant,
    };
    if (montant && compte) {
      this.coreService.addItem(data, "verifier-liste-noire").subscribe(
        (response) => {
          if (response["responseCode"] === 200) {
            this.listeNoire = true;
          } else if (response["responseCode"] === 400) {
            this.listeNoire = false;
          }
        },
        (error) => {
          if (error.status == 400) {
            this.listeNoire = false;
            this.changeDetectorRefs.markForCheck();
          } else if (error.status == 200) {
            this.listeNoire = true;
          }
        }
      );
    }
  }

  addItems() {
    // if(this.listeNoire){
    console.log("====================================");
    console.log(this.initForm.value);
    console.log("====================================");
    this.snackbar
      .showConfirmation("Voulez-vous vraiment ajouter ce pap ?")
      .then((result) => {
        if (result["value"] == true) {
          this.loader = true;
          const value = this.initForm.value;
          this.coreService.addItem(value, this.url).subscribe(
            (resp) => {
              if (resp["responseCode"] == 200) {
                this.snackbar.openSnackBar("Pap  ajoutée avec succés", "OK", [
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
              console.log(error);

              this.loader = false;
              this.changeDetectorRefs.markForCheck();
              this.snackbar.showErrors(error.message);
            }
          );
        }
      });
    // }else if(!this.listeNoire){
    //
    // }
  }

  updateItems() {
    this.snackbar
      .showConfirmation(
        "Voulez-vous vraiment modifier cette personne affectée ?"
      )
      .then((result) => {
        if (result["value"] == true) {
          this.loader = true;
          const value = this.initForm.value;
          this.coreService.updateItem(value, this.id, this.url).subscribe(
            (resp) => {
              if (resp) {
                this.loader = false;
                this.matDialogRef.close(resp);
                this.snackbar.openSnackBar(
                  "Personne affectée modifiée avec succés",
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
}
