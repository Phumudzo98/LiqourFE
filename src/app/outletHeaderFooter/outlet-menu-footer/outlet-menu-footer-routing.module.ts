import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutletMenuFooterPage } from './outlet-menu-footer.page';

const routes: Routes = [
  {
    path: '',
    component: OutletMenuFooterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutletMenuFooterPageRoutingModule {}
