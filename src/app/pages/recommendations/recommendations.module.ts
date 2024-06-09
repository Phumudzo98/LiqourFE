import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendationsPageRoutingModule } from './recommendations-routing.module';

import { RecommendationsPage } from './recommendations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendationsPageRoutingModule
  ],
  declarations: [RecommendationsPage]
})
export class RecommendationsPageModule {}
