import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessConductPage } from './business-conduct.page';

const routes: Routes = [
  {
    path: '',
    component: BusinessConductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessConductPageRoutingModule {}
