import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateGisPage } from './update-gis.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateGisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateGisPageRoutingModule {}
