import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Observable } from "rxjs";
import { BsModalService, ModalDirective } from "ngx-bootstrap/modal";
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { deleteuserlist } from "src/app/store/UserList/userlist.action";
import { selectData } from "src/app/store/UserList/userlist-selector";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { validatePhoneNumberSn } from "src/app/shared/pipes/numberSn";
import { MoService } from "src/app/core/services/mo.service";
import { Image } from "src/app/shared/models/image.model";
import { Mo, ResponseData } from "src/app/shared/models/Projet.model";
import { ToastrService } from "ngx-toastr";
import { el } from "@fullcalendar/core/internal-common";
import { Project } from "../../projects/project.model";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { UtilsService } from "src/app/shared/utils/utils.service";
import { User } from "src/app/store/Authentication/auth.models";
import { LocalService } from "src/app/core/services/local.service";

@Component({
  selector: "app-molist",
  templateUrl: "./molist.component.html",
  styleUrl: "./molist.component.css",
})
export class MolistComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  contactsList: any;
  // Table data
  total: Observable<number>;
  createMoForm!: UntypedFormGroup;
  submitted = false;
  contacts: any;
  files: File[] = [];
  endItem: any;

  listMo: Mo[] = [];

  @ViewChild("newContactModal", { static: false })
  newContactModal?: ModalDirective;
  @ViewChild("removeItemModal", { static: false })
  removeItemModal?: ModalDirective;
  deleteId: any;
  returnedArray: any;

  @Input() fromDate: Date;
  @Input() toDate: Date;
  @Output() dateRangeSelected: EventEmitter<{}> = new EventEmitter();

  @ViewChild("dp", { static: true }) datePicker: any;

  dropdownData: any[] = [];
  settings: IDropdownSettings = {};
  form!: FormGroup;
  selectedItems: any[] = [];

  user:User
  constructor(
    private formBuilder: FormBuilder,
    private moservice: MoService,
    public store: Store,
    public toastr: ToastrService,
  //  private utilsService: UtilsService,
    private localService: LocalService
  ) {}

  myImage: string;
  getImageFromBase64(imageType: string, imageName: number[]): string {
    const base64Representation = "data:" + imageType + ";base64," + imageName;
    return base64Representation;
  }

  //getImageFromBase64=this.utilsService.getImageFromBase64(imageType: string, imageName: number[]);
  ngOnInit() {
    this.user=this.localService.getDataJson("user");
    console.log("user local data: ", this.user);


    this.breadCrumbItems = [
      { label: "Maitres d'ouvrages" },
      { label: "Listes", active: true },
    ];
    setTimeout(() => {
      this.fetchMo();
      document.getElementById("elmLoader")?.classList.add("d-none");
    }, 1200);

    this.createMoForm = this.formBuilder.group({
      id: [""],
      lastname: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(70),
        ],
      ],
      firstname: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(70),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
      contact: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(70),
          validatePhoneNumberSn(),
        ],
      ],
      locality: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(70),
        ],
      ],
      date_of_birth: ["", [Validators.required]],
      place_of_birth: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(70),
        ],
      ],
      // image: ["", []],
      project_ids: [[], this.formBuilder.array([])],
    });
    this.loadProject();
    this.settings = {
      idField: "id",
      textField: "libelle",
      selectAllText: "Select All Data",
      unSelectAllText: "UnSelect All Data",
      allowSearchFilter: true,
      noDataAvailablePlaceholderText: "Nothing to show data",
    };
  }

  onDataSelect(item: any) {
    console.log("onData Select", this.createMoForm.get("project_ids").value);
  }

  onUnSelectAll() {
    console.log("onData Select", this.createMoForm.get("project_ids").value);
  }

  onDataDeSelect(item: any) {
    console.log("onData Select", this.createMoForm.get("project_ids").value);
  }

  onSelectAll(items: any) {
    console.log("onData Select", this.createMoForm.get("project_ids").value);
  }

  onDeSelectAll(items: any) {
    console.log("onData Select", this.createMoForm.get("project_ids").value);
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

  selectedProjects: any[] = [];

  private updateSelectedProjects() {
    const selectedProjectsDetails = this.selectedProjects.map((project) => ({
      id: +project.id, // Convertit l'ID en nombre si nécessaire
      libelle: project.libelle, // Assure que le libellé est inclus
    }));
    this.createMoForm.patchValue({ project_ids: selectedProjectsDetails });
  }

  get f() {
    return this.createMoForm.controls;
  }
  // File Upload
  uploadedImage!: File;
  imageURL: string | undefined;
  saveUser() {
    var updateBtn = document.getElementById(
      "addContact-btn"
    ) as HTMLAreaElement;

    if (updateBtn.innerHTML == "Créer") {
      if (this.uploadedImage) {
        return this.moservice
          .uploadImage(this.uploadedImage, this.uploadedImage.name)
          .subscribe((ima: Image) => {
            this.handleCreateMoForm(ima);
          });
      } else {
        return this.handleCreateMoForm();
      }
    } else {
      return this.updateUser();
    }
  }

  handleCreateMoForm(image?: Image) {
    const projectRequest = this.createMoForm.value;
    if (image) {
      projectRequest.image = image;
    }
    if (this.createMoForm.get("project_ids").value) {
      projectRequest.project_ids = this.createMoForm
        .get("project_ids")
        .value.map((project: any) => +project.id);
    }
    this.moservice
      .add<ResponseData<Mo>>("users/createMo", projectRequest)
      .subscribe(
        (data: ResponseData<Mo>) => {
          console.log(data.data);
          this.toastr.success(data.message);
          this.listMo.unshift(data.data);
          this.createMoForm.reset();
          this.newContactModal.hide();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  // fiter job
  searchJob() {
    if (this.term) {
      this.contactsList = this.returnedArray.filter((data: any) => {
        return data.name.toLowerCase().includes(this.term.toLowerCase());
      });
    } else {
      this.contactsList = this.returnedArray;
    }
  }

  filteredMo: Mo[] = [];
  filterTable(event: any) {
    const searchValue = event.target.value.toLowerCase();
    if (searchValue) {
      this.filteredMo = this.listMo.filter(
        (project) =>
          project.email.toLowerCase().includes(searchValue) ||
          project.contact.toLowerCase().includes(searchValue) ||
          project.locality.toLowerCase().includes(searchValue) ||
          project.lastname.toLowerCase().includes(searchValue)
      );
    } else {
      this.filteredMo = this.listMo;
    }
  }

  // Edit User
  editUser(id: any) {
    this.submitted = false;
    this.newContactModal?.show();
    var modelTitle = document.querySelector(".modal-title") as HTMLAreaElement;
    modelTitle.innerHTML = "Edit Profile";
    var updateBtn = document.getElementById(
      "addContact-btn"
    ) as HTMLAreaElement;
    updateBtn.innerHTML = "Update";
    this.createMoForm.patchValue(this.listMo[id]);
    if (this.listMo[id].image) {
      document.querySelectorAll("#member-img").forEach((element: any) => {
        element.src = this.getImageFromBase64(
          this.listMo[id].image.type,
          this.listMo[id].image.image
        );
      });
      const image: any = this.getImageFromBase64(
        this.listMo[id].image.type,
        this.listMo[id].image.image
      );
      const file = this.base64ToFile(image, this.listMo[id].image.name);
      this.uploadedImage = file;
    }

    this.selectedProjects = this.listMo[id].projects;

    console.log(this.selectedProjects);
    this.updateSelectedProjects();
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

  // pagechanged
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.contactsList = this.returnedArray.slice(startItem, this.endItem);
  }

  // Delete User
  removeUser(id: any) {
    this.deleteId = id;
    this.removeItemModal?.show();
  }

  confirmDelete(id: any) {
    this.store.dispatch(deleteuserlist({ id: this.deleteId }));
    this.removeItemModal?.hide();
  }

  fetchMo() {
    return this.moservice
      .all<ResponseData<Mo[]>>("users/by_role?roleName=Maitre d'ouvrage")
      .subscribe((users: ResponseData<Mo[]>) => {
        this.listMo = users.data;
        this.filteredMo = this.listMo;
      });
  }

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

  // updateUser() {

  //   const projectRequest = this.createMoForm.value;
  //   if (this.uploadedImage) {
  //     return this.moservice
  //       .updateImage(
  //         this.uploadedImage,
  //         this.uploadedImage.name,
  //         this.createMoForm.get("id").value
  //       )
  //       .subscribe(
  //         (ima: Image) => {
  //           projectRequest.image = ima;
  //           this.updateUserDetails(projectRequest);
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //   } else {
  //     this.updateUserDetails(projectRequest);
  //   }
  // }
  updateUser() {
    const projectRequest = this.createMoForm.value;

    // Récupérer et transformer project_ids en un tableau d'ID
    const projectIdsControl = this.createMoForm.get("project_ids");
    if (projectIdsControl && Array.isArray(projectIdsControl.value)) {
      const projectIdsArray = projectIdsControl.value.map(
        (project: { id: any }) => project.id
      );
      projectRequest.project_ids = projectIdsArray; // Mettez à jour projectRequest avec le tableau d'ID
    }

    if (this.uploadedImage) {
      return this.moservice
        .updateImage(
          this.uploadedImage,
          this.uploadedImage.name,
          this.createMoForm.get("id").value
        )
        .subscribe(
          (ima: Image) => {
            projectRequest.image = ima;
            this.updateUserDetails(projectRequest);
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      this.updateUserDetails(projectRequest);
    }
  }

  updateUserDetails(projectRequest) {
    this.moservice
      .update<ResponseData<Mo>, Mo>("users/updateMo", projectRequest)
      .subscribe(
        (data: ResponseData<Mo>) => {
          console.log(data.data);
          this.toastr.success(data.message);
          const index = this.listMo.findIndex((mo) => mo.id === data.data.id);
          if (index !== -1) {
            this.listMo[index] = data.data;
          }
          this.createMoForm.reset();
          this.newContactModal.hide();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  deleteUser(userId: number) {
    this.moservice.delete<ResponseData<Mo>>(userId, "users/deleteMo").subscribe(
      (data: ResponseData<any>) => {
        console.log(data.message);
        this.toastr.success(data.message);
        this.filteredMo = this.filteredMo.filter((mo) => mo.id !== userId);
        this.removeItemModal?.hide();
      },
      (err) => {
        console.log(err);
        this.toastr.error("Error deleting user");
      }
    );
  }
  projectlist: any;
  loadProject() {
    return this.moservice
      .all<ResponseData<Project[]>>("projects/all")
      .subscribe((data: ResponseData<Project[]>) => {
        this.projectlist = data.data;
      });
  }
}
