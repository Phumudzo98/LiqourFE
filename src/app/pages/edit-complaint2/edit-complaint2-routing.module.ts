import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComplaint2Page } from './edit-complaint2.page';

const routes: Routes = [
  {
    path: '',
    component: EditComplaint2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditComplaint2PageRoutingModule {}
