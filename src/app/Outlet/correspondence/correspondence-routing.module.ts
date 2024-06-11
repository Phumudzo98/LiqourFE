import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorrespondencePage } from './correspondence.page';

const routes: Routes = [
  {
    path: '',
    component: CorrespondencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorrespondencePageRoutingModule {}
