import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { FormBuilder, Validators, FormArray, FormGroup } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Router } from "@angular/router";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { ToastrService } from "ngx-toastr";
import { Observable, debounceTime, switchMap, of } from "rxjs";
import { ProjectService } from "src/app/core/services/project.service";
import { dateValidator } from "src/app/shared/validator/datevalidator";
import { Project, ResponseData, NormeProject, Mo } from "../project.model";
import { SharedService } from "../shared.service";
import { Image } from "src/app/shared/models/image.model";
@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrl: "./update.component.css",
})
export class UpdateComponent {
  suggestions$!: Observable<string[]>;
  listProject: Project[];

  buttonText: string = "Créer le projet";
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    public toastr: ToastrService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.projectForm = this.fb.group(
      {
        id: [],
        libelle: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(150),
          ],
        ],
        status: ["", Validators.required],
        categorie: [
          "",
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ],
        ],
        description: [
          "",
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(500),
          ],
        ],
        datedebut: ["", Validators.required],
        datefin: ["", Validators.required],
        // image: ["", Validators.required],
        attachedFiles: [],
        users: this.fb.array([]),
      },
      { validators: dateValidator() }
    );
    this.suggestions$ = this.projectForm.get("categorie").valueChanges.pipe(
      debounceTime(200),
      switchMap((query) => of(["agricole", "miniére", "traveaux publiques"]))
    );
  }
  get assignListFormArray(): FormArray {
    return this.projectForm.get("users") as FormArray;
  }

  get f() {
    return this.projectForm.controls;
  }
  // bread crumb items
  breadCrumbItems: Array<{}>;
  selected: any;
  hidden: boolean;
  files: File[] = [];
  assignMember: any;
  projectForm: FormGroup;

  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();

  @ViewChild("dp", { static: true }) datePicker: any;
  dropdownList = [];
  selectedItems = [];

  membersData: any[] = [];

  form: FormGroup;
  dropdownSettings = {};
  ngOnInit() {
    this.projectForm.reset();
    this.breadCrumbItems = [
      { label: "Projects" },
      { label: "Create New", active: true },
    ];
    this.fetchMo();
    this.selected = "";
    this.hidden = true;
    this.assignMember = this.listMo;
    this.loadProject();

    this.form = this.fb.group({
      members: this.fb.array([]),
    });

    this.sharedService.selectedItem$.subscribe((item) => {
      console.log("====================================");
      console.log(item);
      console.log("====================================");
      if (item) {
        this.projectForm.patchValue({
          id: item.id,
          libelle: item.libelle,
          status: item.status,
          categorie: item.categorie,
          description: item.description,
          datedebut: item.datedebut,
          datefin: item.datefin,
        });
        //this.members.patchValue(item.)
        //this.listMo = item.users;

        this.membersData = item.normeProjets;
        item.normeProjets.forEach((member) => {
          this.addMember(member);
        });

        //files

        item.files.forEach((file) => {
          const dataURL = `data:${file.type};base64,${file.file}`;
          const file1 = this.base64ToFile(
            file.file,
            file.name,
            file.type,
            dataURL
          );
          console.log(file1);
          this.uploadedFiles.push(file1);

          this.projectForm.patchValue({
            attachedFiles: this.uploadedFiles,
          });
        });

        console.log("====================================");
        console.log(this.uploadedFiles);
        console.log("====================================");

        this.toff = this.getImageFromBase64(item.image.type, item.image.image);
        console.log("====================================");
        console.log("toff" + this.toff);
        console.log("====================================");
        this.buttonText = "Modifier le projet";
        console.log("====================================");
        console.log("biuio", this.buttonText);
        console.log("====================================");
        this.listMo = item.users.map((user) => {
          return {
            ...user,
            checked: "1",
          };
        });
        console.log("====================================");
        console.log("users", this.listMo);
        console.log("====================================");
        for (let index = 0; index < this.listMo.length; index++) {
          this.assignList.push(this.listMo[index]);
          this.assignListFormArray.push(this.fb.control(this.listMo[index]));
        }
        // this.assignListFormArray.push(this.fb.control(this.listMo[id]));
        console.log("assis", this.assignList);
      }
    });

    //loadimageforupdate
  }

  // File Upload
  imageURL: any;
  onSelect(event: any) {
    this.files.push(...event.addedFiles);
    let file: File = event.addedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      this.f.image.patchValue(this.imageURL);
      setTimeout(() => {
        // this.profile.push(this.imageURL)
      }, 100);
    };
    reader.readAsDataURL(file);
  }

  assignList: any = [];
  slectMember(id: number) {
    if (this.listMo[id].checked == "0") {
      this.listMo[id].checked = "1";
      this.assignList.push(this.listMo[id]);
      console.log("====================================");
      console.log("push", this.assignList);
      console.log("====================================");
      this.assignListFormArray.push(this.fb.control(this.listMo[id]));
    } else {
      this.listMo[id].checked = "0";
      const index = this.assignList.findIndex(
        (member) => member.id === this.listMo[id].id
      );
      if (index !== -1) {
        this.assignList.splice(index, 1);
        this.assignListFormArray.removeAt(index);
      }
    }
  }

  create() {
    return this.projectService
      .add<ResponseData<Project>>(
        "projects/createProject",
        this.projectForm.value
      )
      .subscribe((data: ResponseData<Project>) => {
        this.toastr.success(`${data.message}`);
        this.projectForm.reset();
      });
  }

  uploadedImage!: File;
  toff: any;

  //uploadedFiles!: File[];

  imagePath: any;
  newProject: Project;
  newIdCat!: number;

  loadProject() {
    return this.projectService
      .all<ResponseData<Project[]>>("projects/all")
      .subscribe((data: ResponseData<Project[]>) => {
        this.listProject = data.data;
        console.log(this.listProject);
      });
  }
  // filechange
  imageURLs: any;
  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];
    this.uploadedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageURLs = reader.result as string;
      this.toff = this.imageURLs;
      //  reader.readAsDataURL(this.uploadedImage);
      document.querySelectorAll("#projectlogo-img").forEach((element: any) => {
        element.src = this.imageURLs;
      });
      console.log("====================================");
      console.log(this.imageURLs);
      console.log("====================================");
    };
  }
  // file upload
  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
    acceptedFiles: null,
  };

  uploadedFiles: any[] = [];
  uploadFiles1: File[] = [];

  updateForm(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.projectForm.patchValue({
      categorie: inputValue,
    });
  }
  updateFormWithSelectedOption(event: MatAutocompleteSelectedEvent) {
    this.projectForm.patchValue({
      categorie: event.option.value,
    });
  }

  //task
  // form:FormGroup = new FormGroup({
  //   members: this.fb.array([]),
  // });

  /**
   * Returns the form field value
   */
  get members(): FormArray {
    return this.form.get("members") as FormArray;
  }

  addMember(memberData?: any) {
    if (this.members.length > 0) {
      const lastMember = this.members.at(this.members.length - 1);
      if (!lastMember.valid) {
        console.log("The last member is invalid. Cannot add a new member.");
        return;
      }
    }

    const memberForm = this.fb.group({
      titre: [memberData ? memberData.titre : "", [Validators.required]],
      description: [
        memberData ? memberData.description : "",
        [Validators.required],
      ],
    });

    this.members.push(memberForm);
  }

  deleteMember(i: number) {
    this.members.removeAt(i);
  }

  listMo: Mo[] = [];
  fetchMo() {
    return this.projectService
      .all<ResponseData<Mo[]>>("users/by_role?roleName=Maitre d'ouvrage")
      .subscribe((users: ResponseData<Mo[]>) => {
        this.listMo = users.data.map((user) => {
          return {
            ...user,
            checked: "0",
          };
        });
      });
  }

  myImage: string;
  getImageFromBase64(imageType: string, imageName: number[]): string {
    const base64Representation = "data:" + imageType + ";base64," + imageName;
    return base64Representation;
  }

  update(): void {
    const projectRequest = this.projectForm.value;
    const attachedFiles: File[] = this.projectForm.get("attachedFiles").value;
    // Vérifier si uploadedImage est défini
    if (this.uploadedImage) {
      this.projectService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe(
          (img: Image) => {
            if (img) {
              projectRequest.image = img;
            }
            this.updateProject(projectRequest);
          },
          (error) => {
            console.error("Error uploading image:", error);
            // Continuer avec la mise à jour du projet même en cas d'erreur de téléchargement d'image
            this.updateProject(projectRequest);
          }
        );
    } else {
      console.warn("No image uploaded. Proceeding without uploading image.");
      this.updateProject(projectRequest);
    }
  }

  updateProject(projectRequest: any): void {
    this.projectService
      .update<ResponseData<Project>, Project>(
        `projects/updateProject`,
        projectRequest
      )
      .subscribe(
        (data: ResponseData<Project>) => {
          console.log("Project updated successfully:", data);
          this.toastr.success(`${data.message}`);

          // Upload attached files if there are any
          const attachedFiles: File[] =
            this.projectForm.get("attachedFiles").value;
          if (data) {
            const normeProjects: NormeProject[] = this.members.value;
            normeProjects.forEach((normeProject: any) => {
              normeProject.project = data.data;
            });
            this.projectService
              .saveNormeProjet1(normeProjects, data.data.id)
              .subscribe(
                (response: NormeProject[]) => {
                  console.log(response);
                  this.router.navigate(["/projects/list"]);
                  this.projectForm.reset();
                },
                (err) => {
                  console.log(err);
                }
              );
          }
        },
        (error) => {
          console.error("Error updating project:", error);
        }
      );
  }
  updateNormeProjects(projectId: number, normeProjects: NormeProject[]): void {
    normeProjects.forEach((normeProject: any) => {
      normeProject.project = { id: projectId }; // Assuming normeProject has a 'project' property that is an object
      this.projectService.saveNormeProjet(normeProject, projectId).subscribe(
        (data) => {
          console.log("Norme updated successfully:", data);
        },
        (err) => {
          console.error("Error updating norme:", err);
        }
      );
    });
  }

  // Conversion du Base64 en fichier
  base64ToFile(
    base64String: string,
    fileName: string,
    mimeType: string,
    dataURL: string
  ): File {
    // Décoder la chaîne Base64 en une chaîne binaire
    const byteString = atob(base64String);
    const byteNumbers = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charCodeAt(i);
    }

    // Créer un tableau de type Uint8Array à partir des octets
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    // Créer un objet File à partir du Blob
    const file = new File([blob], fileName, { type: mimeType });

    // Ajouter la propriété dataURL
    Object.defineProperty(file, "dataURL", {
      value: dataURL,
      writable: false,
      enumerable: true,
    });

    return file;
  }
}
