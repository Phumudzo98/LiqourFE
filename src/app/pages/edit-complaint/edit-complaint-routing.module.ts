import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComplaintPage } from './edit-complaint.page';

const routes: Routes = [
  {
    path: '',
    component: EditComplaintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditComplaintPageRoutingModule {}
