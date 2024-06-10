import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutletDashboardPage } from './outlet-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: OutletDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutletDashboardPageRoutingModule {}
