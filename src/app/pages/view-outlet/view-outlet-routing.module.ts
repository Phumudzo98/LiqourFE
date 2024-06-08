import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewOutletPage } from './view-outlet.page';

const routes: Routes = [
  {
    path: '',
    component: ViewOutletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewOutletPageRoutingModule {}
