import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InspectorPage } from './inspector.page';

const routes: Routes = [
  {
    path: '',
    component: InspectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectorPageRoutingModule {}
