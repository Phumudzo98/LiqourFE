import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateLocationPage } from './update-location.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateLocationPageRoutingModule {}
