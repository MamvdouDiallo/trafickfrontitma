import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { taskChart, tasks } from './data';

import { ChartType, Tasklist } from './list.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SnackBarService } from 'src/app/shared/core/snackBar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from 'src/app/core/services/local.service';
import { ServiceParent } from 'src/app/core/services/serviceParent';
import { CoreService } from 'src/app/shared/core/core.service';
import { PapAddComponent } from '../../pap/pap-add/pap-add.component';
import { PapService } from '../../pap/pap.service';
import { SharedService } from '../../projects/shared.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

/**
 * Tasks-list component
 */
export class ListComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  modalRef?: BsModalRef;

  submitted = false;
  formData: UntypedFormGroup;

  taskChart: ChartType;

  upcomingTasks: Tasklist[];
  inprogressTasks: Tasklist[];
  completedTasks: Tasklist[];
  myFiles: string[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  informations: any;
  displayedColumns: any;
  searchList: any;
  codeEnvoye: number; //code envoye par notre menu
  hasList: boolean;
  hasAdd: boolean;
  hasUpdate: boolean;
  hasDelete: boolean;
  hasDetail: boolean;
  length = 100;
  searchForm: UntypedFormGroup;
  dialogRef: any;
  dataSource: MatTableDataSource<any>;
  datas = [];
  deleteUser: boolean = false;
  currentIndex;
  loadData: boolean = false;
  exporter: boolean = false;
  isCollapsed: boolean = false;
  isSearch2: boolean = false;
  isSearch: boolean = false;
  rechercher = "";
  showLoader = "isNotShow";
  message = "";
  config: any;
  isLoading: boolean = false;
  pageSizeOptions = [5, 10, 25, 100, 500, 1000];
  pageSize: number = 10;
  pageIndex: number = 0;
  //constantes = CONSTANTES;
  userConnecter;
  offset: number = 0;
  title: string = "Gestion des produits";
  url: string = "taches";
  panelOpenState = false;
  img;
  image;
  privilegeByRole: any; //liste des codes recu de l'api lors de la connexion
  privilegeForPage: number = 2520; //code privilege envoye pour afficher la page
  privilegePage;
  headers: any = [];
  btnActions: any = [];

  constructor(private modalService: BsModalService, private formBuilder: UntypedFormBuilder,
   
    private parentService: ServiceParent,
    public toastr: ToastrService,

  ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Tasks' }, { label: 'Task List', active: true }];

    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]],
      file: new UntypedFormControl('', [Validators.required]),
      taskType: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    this._fetchData();
    this.getTaches();
  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push('assets/images/users/' + event.target.files[i].name);
    }
  }

  _fetchData() {
    // all tasks
    this.inprogressTasks = tasks.filter(t => t.taskType === 'inprogress');
    this.upcomingTasks = tasks.filter(t => t.taskType === 'upcoming');
    this.completedTasks = tasks.filter(t => t.taskType === 'completed');

    this.taskChart = taskChart;
  }


  get form() {
    return this.formData.controls;
  }

  listData() {
    if (this.formData.valid) {
      const name = this.formData.get('name').value;
      const status = this.formData.get('status').value;
      const taskType = this.formData.get('taskType').value;
      tasks.push({
        index: tasks.length + 1,
        name,
        status,
        taskType,
        images: this.myFiles,
        checked: true
      })
    }
    this.modalService.hide()
    this._fetchData();
    this.submitted = false;
  }
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalRef = this.modalService.show(content);
  }
  taches: any[];
  getTaches() {
    return this.parentService
      .list(this.url, this.pageSize, this.offset)
      .subscribe(
        (data: any) => {
          this.loadData = false;
          if (data["responseCode"] == 200) {
            this.taches = data["data"]
            console.log(this.taches);

          } else {
            this.loadData = false;
            this.dataSource = new MatTableDataSource();
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
