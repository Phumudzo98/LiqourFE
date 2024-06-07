import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTasksPage } from './my-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: MyTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTasksPageRoutingModule {}
