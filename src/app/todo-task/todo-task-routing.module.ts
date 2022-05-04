import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoTaskPage } from './todo-task.page';

const routes: Routes = [
  {
    path: '',
    component: TodoTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoTaskPageRoutingModule {}
