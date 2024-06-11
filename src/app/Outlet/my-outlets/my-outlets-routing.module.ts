import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyOutletsPage } from './my-outlets.page';

const routes: Routes = [
  {
    path: '',
    component: MyOutletsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyOutletsPageRoutingModule {}
