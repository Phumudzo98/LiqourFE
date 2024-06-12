import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutlethaederPageRoutingModule } from './outlethaeder-routing.module';

import { OutlethaederPage } from './outlethaeder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutlethaederPageRoutingModule
  ],
  declarations: [OutlethaederPage],
  exports:[OutlethaederPage]
})
export class OutlethaederPageModule {}
