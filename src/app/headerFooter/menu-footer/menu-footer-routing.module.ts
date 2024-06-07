import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuFooterPage } from './menu-footer.page';

const routes: Routes = [
  {
    path: '',
    component: MenuFooterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuFooterPageRoutingModule {}
