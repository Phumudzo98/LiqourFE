import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorrespondencePageRoutingModule } from './correspondence-routing.module';

import { CorrespondencePage } from './correspondence.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorrespondencePageRoutingModule
  ],
  declarations: [CorrespondencePage]
})
export class CorrespondencePageModule {}
