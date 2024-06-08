import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuHeaderPage } from './menu-header.page';

const routes: Routes = [
  {
    path: '',
    component: MenuHeaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuHeaderPageRoutingModule {}
