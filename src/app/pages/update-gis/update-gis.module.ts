import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateGisPageRoutingModule } from './update-gis-routing.module';

import { UpdateGisPage } from './update-gis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateGisPageRoutingModule
  ],
  declarations: [UpdateGisPage]
})
export class UpdateGisPageModule {}
