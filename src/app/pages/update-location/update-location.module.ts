import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateLocationPageRoutingModule } from './update-location-routing.module';

import { UpdateLocationPage } from './update-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateLocationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateLocationPage]
})
export class UpdateLocationPageModule {}
