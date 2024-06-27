import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteGisReportPage } from './complete-gis-report.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteGisReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteGisReportPageRoutingModule {}
