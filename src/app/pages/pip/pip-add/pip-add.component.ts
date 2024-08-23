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
  FormGroup,
  FormArray,
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
import { Router } from "@angular/router";
import { LocalService } from "src/app/core/services/local.service";

@Component({
  selector: "app-pap-add",
  templateUrl: "./pip-add.component.html",
  styleUrl: "./pip-add.component.css",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    AngularMaterialModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: DateAdapter, useClass: MatNativeDateModule },
    { provide: MatPaginatorIntl },
    SnackBarService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PipAddComponent implements OnInit {
  panelOpenState = false;
  @ViewChild("drawer") drawer: MatDrawer;
  @ViewChild("stepper") private myStepper: MatStepper;
  dialogTitle: string;
  id: string;
  initForm: UntypedFormGroup;
  labelButton: string;
  suffixe: string = " une partie intéréssé ";
  countries: any;
  categories: any[] = [
    { id: "1", libelle: "Agricole" },
    { id: "2", libelle: "Miniere" },
  ];
  sexe = [
    { name: "Homme", id: "Masculin" },
    { name: "Femme", id: "Feminim" },
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
  url = "partie-interesse";
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
  categoriePartieInteresses: any;
  lienBrute: string;
  lien: string;
  currentUser: any;


  constructor(
    public matDialogRef: MatDialogRef<PipAddComponent>,
    @Inject(MAT_DIALOG_DATA) _data,
    private fb: UntypedFormBuilder,
    private coreService: CoreService,
    private snackbar: SnackBarService,
    private changeDetectorRefs: ChangeDetectorRef,
    private _matDialog: MatDialog,
    private router: Router,
    private localService: LocalService
  ) {
    console.log("==data fomrmr==================================");
    console.log(_data.data.pays);
    console.log("====================================");

    this.currentUser=this.localService.getDataJson("user");

    console.log("user connecter",this.currentUser)
    if (_data?.action == "new") {
      this.initForms();
      this.labelButton = "Ajouter ";
    } else if (_data?.action == "edit") {
      this.labelButton = "Modifier ";
      this.id = _data.data.id;
      this.initForms(_data.data);
      if (_data && _data.data.pays) {
        this.initForm.get("pays").setValue(_data.data.pays);
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

  ngOnInit(): void {
    this.getCategoriePartieInteresses();

    this.lienBrute = this.router.url;
    // Extraire une partie spécifique de l'URL
    this.lien = this.lienBrute.substring(1, this.lienBrute.length);
    console.log("URL modifiée:", this.lien);
  }

  goToStep(index) {
    this.myStepper.selectedIndex = index;
  }

  initForms(donnees?) {
    this.initForm = this.fb.group({
      //first step
      libelle: this.fb.control(donnees ? donnees?.libelle : null, [
        Validators.required,
      ]),
      statut: this.fb.control(donnees ? donnees?.statut : null, [
        Validators.required,
      ]),
      courielPrincipal: this.fb.control(
        donnees ? donnees?.courielPrincipal : null,
        [Validators.required]
      ),
      adresse: this.fb.control(donnees ? donnees?.adresse : null, [
        Validators.required,
      ]),
      localisation: this.fb.control(donnees ? donnees?.localisation : null, [
        Validators.required,
      ]),
      categoriePartieInteresse: this.fb.control(
        donnees ? donnees?.categoriePartieInteresse.id : null,
        [Validators.required]
      ),

//second step
      nomContactPrincipal: this.fb.control(donnees ? donnees?.nomContactPrincipal : null, [
          Validators.required,
        ]),
        prenomContactPrincipal: this.fb.control(donnees ? donnees?.prenomContactPrincipal : null, [
          Validators.required,
        ]),
        adresseContactPrincipal: this.fb.control(donnees ? donnees?.adresseContactPrincipal : null, [
          Validators.required,
        ]),
        sexeContactPrincipal: this.fb.control(
          donnees ? donnees?.sexeContactPrincipal : null,
          [Validators.required]
        ),
        dateNaissanceContactPrincipal: this.fb.control(donnees ? donnees?.dateNaissanceContactPrincipal : null, [
          Validators.required,
        ]),
        lieuNaisasnceContactPrincipal: this.fb.control(
          donnees
            ? donnees?.lieuNaisasnceContactPrincipal: null,
          [Validators.required]
        ),
        emailContactPrincipal: this.fb.control(
          donnees
            ? donnees?.emailContactPrincipal: null,
          [Validators.required]
        ),
        telephoneContactPrincipal: this.fb.control(
          donnees
            ? donnees?.telephoneContactPrincipal: null,
          [Validators.required]
        ),
        //step 3
        normes: this.fb.control(
          donnees
            ? donnees?.normes
            : null,
          [Validators.required]
        ),
        //projet
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



  firstStep() {
    if (
      this.initForm.get("libelle").invalid ||
      this.initForm.get("statut").invalid ||
      this.initForm.get("courielPrincipal").invalid ||
      this.initForm.get("adresse").invalid ||
      this.initForm.get("localisation").invalid ||
      this.initForm.get("categoriePartieInteresse").invalid
    ) {
      return false;
    } else {
      return true;
    }
  }

  secondStep() {
    if (
      this.initForm.get("nomContactPrincipal").invalid ||
      this.initForm.get("prenomContactPrincipal").invalid ||
      this.initForm.get("adresseContactPrincipal").invalid ||
      this.initForm.get("sexeContactPrincipal").invalid ||
      this.initForm.get("dateNaissanceContactPrincipal").invalid ||
      this.initForm.get("lieuNaisasnceContactPrincipal").invalid ||
      this.initForm.get("emailContactPrincipal").invalid ||
      this.initForm.get("telephoneContactPrincipal").invalid
    ) {
      return false;
    } else {
      return true;
    }
  }

  thirdStep() {
    if (this.initForm.get("normes").invalid) {
      return false;
    } else {
      return true;
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













  getCategoriePartieInteresses() {
    this.coreService.list("categoriesPip", 0, 10000).subscribe((response) => {
      if (response["responseCode"] === 200) {
        this.categoriePartieInteresses = response["data"];
        console.log('====================================');
        console.log(this.categoriePartieInteresses);
        console.log('====================================');
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



  addItems() {
    console.log("====================================");
    console.log(this.initForm.value);
    console.log("====================================");
    this.snackbar
      .showConfirmation( `Voulez-vous vraiment ajouter ce ${this.getCategorie(this.initForm?.get('categoriePartieInteresse')?.value)} ? `)
      .then((result) => {
        if (result["value"] == true) {
          this.loader = true;
          const value = this.initForm.value;
          this.coreService.addItem(value, this.url).subscribe(
            (resp) => {
              if (resp["responseCode"] == 200) {
                this.snackbar.openSnackBar("Pip  ajoutée avec succés", "OK", [
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

  updateItems() {
    this.snackbar
      .showConfirmation(`Voulez-vous vraiment modifier ce ${this.getCategorie(this.initForm?.get('categoriePartieInteresse')?.value)}?  `)
      .then((result) => {
        if (result["value"] == true) {
          this.loader = true;
          const value = this.initForm.value;
          this.coreService.updateItem(value, this.id, this.url).subscribe(
            (resp) => {
              if (resp) {
                this.loader = false;
                this.matDialogRef.close(resp);
                this.snackbar.openSnackBar(`${this.getCategorie(this.initForm?.get('categoriePartieInteresse')?.value)} modifiée avec succés `, "OK", [
                  "mycssSnackbarGreen",
                ]);
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
    this.addItems();
    if (this.initForm.invalid) {
      this.checkValidity(this.initForm);
    } else {
      if (this.canAdd == false) {
        this.addItems();
      }
      if (type == "new") {
        this.addItems();
      } else if (type == "edit") {
        this.updateItems();
      }
    }
  }






  getCategorie(value: any) {
    if (this.categoriePartieInteresses) {
      const liste = this.categoriePartieInteresses.filter((type) => type.id == value);
      return liste.length != 0 ? liste[0]?.libelle : value;
    }
  }




}
