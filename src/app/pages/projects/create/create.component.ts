import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  ViewChild,
  Output,
} from "@angular/core";
import { member } from "./data";
import { DropzoneConfigInterface } from "ngx-dropzone-wrapper";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { Observable, debounceTime, of, switchMap } from "rxjs";
import { ProjectService } from "src/app/core/services/project.service";
import { Project } from "src/app/shared/models/Projet.model";
import { ResponseProject } from "src/app/shared/models/Projet.model";
import { ToastrService } from "ngx-toastr";
import { Image } from "src/app/shared/models/image.model";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})

/**
 * Projects-create component
 */
export class CreateComponent implements OnInit {
  suggestions$!: Observable<string[]>;
  listProject: Project[];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    public toastr: ToastrService
  ) {
    this.projectForm = this.fb.group({
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
      image: ["", Validators.required],
      attachedFiles: [],
      // responsables: this.fb.array([]),
    });
    this.suggestions$ = this.projectForm.get("categorie").valueChanges.pipe(
      debounceTime(200),
      switchMap((query) => of(["test1", "test2", "test3"]))
    );
  }
  get assignListFormArray(): FormArray {
    return this.projectForm.get("responsables") as FormArray;
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
  dropdownSettings = {};
  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Projects" },
      { label: "Create New", active: true },
    ];
    this.selected = "";
    this.hidden = true;
    this.assignMember = member;
    this.loadProject();
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
    if (this.assignMember[id].checked === "0") {
      this.assignMember[id].checked = "1";
      this.assignList.push(this.assignMember[id]);
      this.assignListFormArray.push(this.fb.control(this.assignMember[id]));
    } else {
      this.assignMember[id].checked = "0";
      const index = this.assignList.findIndex(
        (member) => member.id === this.assignMember[id].id
      );
      if (index !== -1) {
        this.assignList.splice(index, 1);
        this.assignListFormArray.removeAt(index);
      }
    }
    console.log("====================================");
    console.log(this.assignList);
    console.log("====================================");
  }

  create() {
    return this.projectService
      .add<ResponseProject<Project>>(
        "projects/createProject",
        this.projectForm.value
      )
      .subscribe((data: ResponseProject<Project>) => {
        this.toastr.success(`${data.message}`);
        this.projectForm.reset();
      });
  }

  uploadedImage!: File;

  imagePath: any;
  newProject: Project;
  newIdCat!: number;
  // addProduit() {
  //   this.projectService
  //     .uploadImage(this.uploadedImage, this.uploadedImage.name)
  //     .subscribe((img: Image) => {
  //       const projectRequest = this.projectForm.value;
  //       projectRequest.image = img;
  //       this.projectService
  //         .add("projects/createProject", projectRequest)
  //         .subscribe((data) => {
  //           console.log("====================================");
  //           console.log(data);
  //           console.log("====================================");
  //         });
  //     });
  // }

  addProduit() {
    this.projectService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe(
        (img: Image) => {
          const projectRequest = this.projectForm.value;
          projectRequest.image = img;
          this.projectService
            .add<ResponseProject<Project>>(
              "projects/createProject",
              projectRequest
            )
            .subscribe(
              (data: ResponseProject<Project>) => {
                console.log("Project created successfully:", data);
                // Upload attached files if there are any
                const attachedFiles: File[] =
                  this.projectForm.get("attachedFiles").value;
                if (attachedFiles && attachedFiles.length > 0) {
                  attachedFiles.forEach((file) => {
                    this.projectService
                      .uploadFile(file, file.name, data.data.id)
                      .subscribe(
                        (uploadedFile) => {
                          console.log(
                            "File uploaded successfully:",
                            uploadedFile
                          );
                        },
                        (error) => {
                          console.error("Error uploading file:", error);
                        }
                      );
                  });
                }
              },
              (error) => {
                console.error("Error creating project:", error);
              }
            );
        },
        (error) => {
          console.error("Error uploading image:", error);
        }
      );
  }

  loadProject() {
    return this.projectService
      .all<ResponseProject<Project[]>>("projects/all")
      .subscribe((data: ResponseProject<Project[]>) => {
        this.listProject = data.data;
        console.log("====================================");
        console.log(this.listProject);
        console.log("====================================");
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
      reader.readAsDataURL(this.uploadedImage);
      document.querySelectorAll("#projectlogo-img").forEach((element: any) => {
        element.src = this.imageURLs;
      });
    };
    console.log("====================================");
    console.log(this.uploadedImage.name);
    console.log("====================================");
  }
  // file upload
  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
    acceptedFiles: null,
  };

  uploadedFiles: any[] = [];
  uploadFiles1: any[] = [];

  // File Upload
  onUploadSuccess(event: any) {
    const file = event[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      const fileWithBase64 = {
        name: file.name,
        size: file.size,
        type: file.type,
        dataURL: base64String,
      };
      this.uploadedFiles.push(fileWithBase64);
      // Mettre à jour attachedFiles dans projectForm
      this.projectForm.patchValue({
        attachedFiles: this.uploadedFiles,
      });
    };
    reader.readAsDataURL(file);
  }

  // File Remove
  removeFile(event: any) {
    const index = this.uploadedFiles.indexOf(event);
    if (index > -1) {
      this.uploadedFiles.splice(index, 1);
      this.projectForm.patchValue({
        attachedFiles: this.uploadedFiles,
      });
    }
  }

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
}
