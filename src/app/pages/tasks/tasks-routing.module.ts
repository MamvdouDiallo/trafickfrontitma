import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { KanbanboardComponent } from './kanbanboard/kanbanboard.component';
import { CreatetaskComponent } from './createtask/createtask.component';
import { ListTacheComponent } from './listTache/list.component';

const routes: Routes = [
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: 'kanban',
        component: KanbanboardComponent
    },
    {
        path: 'create',
        component: CreatetaskComponent
    },
    {
      path: 'liste',
      component: ListTacheComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TasksRoutingModule { }
