import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyOutletsPageRoutingModule } from './my-outlets-routing.module';

import { MyOutletsPage } from './my-outlets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyOutletsPageRoutingModule
  ],
  declarations: [MyOutletsPage]
})
export class MyOutletsPageModule {}
