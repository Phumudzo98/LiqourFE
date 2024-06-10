import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateOutletLocationPage } from './update-outlet-location.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateOutletLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateOutletLocationPageRoutingModule {}
