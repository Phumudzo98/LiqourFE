import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteInspectionPage } from './complete-inspection.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteInspectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteInspectionPageRoutingModule {

 
}
