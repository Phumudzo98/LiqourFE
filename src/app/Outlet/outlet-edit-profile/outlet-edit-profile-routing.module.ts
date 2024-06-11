import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutletEditProfilePage } from './outlet-edit-profile.page';

const routes: Routes = [
  {
    path: '',
    component: OutletEditProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutletEditProfilePageRoutingModule {}
