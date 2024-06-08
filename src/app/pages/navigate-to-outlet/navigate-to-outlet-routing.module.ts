import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavigateToOutletPage } from './navigate-to-outlet.page';

const routes: Routes = [
  {
    path: '',
    component: NavigateToOutletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigateToOutletPageRoutingModule {}
