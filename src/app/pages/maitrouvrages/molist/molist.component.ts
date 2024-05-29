import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { Observable } from "rxjs";
import {
  BsModalService,
  BsModalRef,
  ModalDirective,
} from "ngx-bootstrap/modal";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import {
  adduserlist,
  deleteuserlist,
  fetchuserlistData,
  updateuserlist,
} from "src/app/store/UserList/userlist.action";
import { selectData } from "src/app/store/UserList/userlist-selector";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { validatePhoneNumberSn } from "src/app/shared/pipes/numberSn";

@Component({
  selector: "app-molist",
  templateUrl: "./molist.component.html",
  styleUrl: "./molist.component.css",
})
export class MolistComponent {
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

  constructor(
    private modalService: BsModalService,
    private formBuilder: UntypedFormBuilder,
    public store: Store
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: "Maitres d'ouvrages" },
      { label: "Listes", active: true },
    ];
    setTimeout(() => {
      this.store.dispatch(fetchuserlistData());
      this.store.select(selectData).subscribe((data) => {
        this.contactsList = data;
        this.returnedArray = data;
        this.contactsList = this.returnedArray.slice(0, 10);
      });
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
      address: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(70),
        ],
      ],
      dateofbirth: ["", [Validators.required]],
      placeofbirth: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(70),
        ],
      ],
      image: ["", [Validators.required]],
      project_id: ["", []],
    });
  }

  get f() {
    return this.createMoForm.controls;
  }
  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = event.target as HTMLInputElement;
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      this.f.image.setValue(this.imageURL);
      document.querySelectorAll("#member-img").forEach((element: any) => {
        element.src = this.imageURL;
      });
      this.createMoForm.controls["profile"].setValue(this.imageURL);
    };
    reader.readAsDataURL(file);
  }

  // Save User
  saveUser() {
    console.log("====================================");
    console.log(this.createMoForm.value);
    console.log("====================================");

    // if (this.createMoForm.valid) {
    //   if (this.createMoForm.get("id")?.value) {
    //     const updatedData = this.createMoForm.value;
    //     this.store.dispatch(updateuserlist({ updatedData }));
    //   } else {
    //     this.createMoForm.controls["id"].setValue(
    //       (this.contactsList.length + 1).toString()
    //     );
    //     const newData = this.createMoForm.value;
    //     this.store.dispatch(adduserlist({ newData }));
    //   }
    // }
    // this.newContactModal?.hide();
    // document.querySelectorAll("#member-img").forEach((element: any) => {
    //   element.src = "assets/images/users/user-dummy-img.jpg";
    // });

    // setTimeout(() => {
    //   this.createMoForm.reset();
    // }, 1000);
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
    this.createMoForm.patchValue(this.contactsList[id]);
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
}
