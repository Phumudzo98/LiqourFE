import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessConductPageRoutingModule } from './business-conduct-routing.module';

import { BusinessConductPage } from './business-conduct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessConductPageRoutingModule
  ],
  declarations: [BusinessConductPage]
})
export class BusinessConductPageModule {}
