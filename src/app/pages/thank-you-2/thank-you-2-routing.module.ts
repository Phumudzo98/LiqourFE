import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThankYou2Page } from './thank-you-2.page';

const routes: Routes = [
  {
    path: '',
    component: ThankYou2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThankYou2PageRoutingModule {}
