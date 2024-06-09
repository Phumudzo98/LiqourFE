import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendationsPage } from './recommendations.page';

const routes: Routes = [
  {
    path: '',
    component: RecommendationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendationsPageRoutingModule {}
