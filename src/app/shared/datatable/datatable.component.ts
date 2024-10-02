import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  standalone: true,
  imports:[CommonModule],
  //styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent {
  @Input() headings: [];
  @Input() dataExcel: any[] = [];
  selectedRows = [];
  open = false;

  toggleDropdown() {
    this.open = !this.open;
  }

  toggleColumn(columnKey: string) {
    const column = document.querySelector(`.${columnKey}`);
    column?.classList.toggle('hidden');
  }

  selectAllCheckbox(event: any) {
    const checkboxes = document.querySelectorAll('.rowCheckbox');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = event.target.checked;
    });
    this.selectedRows = event.target.checked ? this.dataExcel.map(user => user.userId) : [];
  }

  getRowDetail(event: any, userId: number) {
    if (event.target.checked) {
      this.selectedRows.push(userId);
    } else {
      const index = this.selectedRows.indexOf(userId);
      if (index > -1) {
        this.selectedRows.splice(index, 1);
      }
    }
  }
}
