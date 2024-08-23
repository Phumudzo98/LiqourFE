import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummonsPage } from './summons.page';

const routes: Routes = [
  {
    path: '',
    component: SummonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummonsPageRoutingModule {}
