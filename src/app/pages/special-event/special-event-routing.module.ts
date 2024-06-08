import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialEventPage } from './special-event.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialEventPageRoutingModule {}
