import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewComplaintPage } from './view-complaint.page';

const routes: Routes = [
  {
    path: '',
    component: ViewComplaintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewComplaintPageRoutingModule {}
