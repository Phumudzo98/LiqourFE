import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutletSettingsPage } from './outlet-settings.page';

const routes: Routes = [
  {
    path: '',
    component: OutletSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OutletSettingsPageRoutingModule {}
