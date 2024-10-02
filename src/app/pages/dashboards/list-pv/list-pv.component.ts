import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-list-pv",
  templateUrl: "./list-pv.component.html",
  styleUrl: "./list-pv.component.css",
})
export class ListPvComponent implements OnInit {
  references: string;
  constructor(
    public matDialogRef: MatDialogRef<ListPvComponent>,
    @Inject(MAT_DIALOG_DATA) _data
  ) {
    this.references = _data.data;
    console.log('====================================');
    console.log(this.references);
    console.log('====================================');
  }
  ngOnInit(): void {}
}
