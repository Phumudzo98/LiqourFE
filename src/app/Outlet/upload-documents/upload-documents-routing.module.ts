import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UploadDocumentsPage } from './upload-documents.page';

const routes: Routes = [
  {
    path: '',
    component: UploadDocumentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadDocumentsPageRoutingModule {}
