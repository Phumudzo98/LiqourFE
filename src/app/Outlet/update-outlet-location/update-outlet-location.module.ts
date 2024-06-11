import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateOutletLocationPageRoutingModule } from './update-outlet-location-routing.module';

import { UpdateOutletLocationPage } from './update-outlet-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateOutletLocationPageRoutingModule
  ],
  declarations: [UpdateOutletLocationPage]
})
export class UpdateOutletLocationPageModule {}
