import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxSpinner } from 'ngx-spinner';

import { Page2Page } from './page-2.page';

const routes: Routes = [
  {
    path: '',
    component: Page2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Page2PageRoutingModule {}
