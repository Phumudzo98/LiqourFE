import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutlethaederPage } from './outlethaeder.page';

const routes: Routes = [
  {
    path: '',
    component: OutlethaederPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutlethaederPageRoutingModule {}
