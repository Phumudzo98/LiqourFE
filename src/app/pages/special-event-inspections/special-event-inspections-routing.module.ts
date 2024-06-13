import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialEventInspectionsPage } from './special-event-inspections.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialEventInspectionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialEventInspectionsPageRoutingModule {}
