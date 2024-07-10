import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateAddressPage } from './update-address.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateAddressPageRoutingModule {}
