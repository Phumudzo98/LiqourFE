import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectionsPage } from './inspections.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionsPageRoutingModule {}
