import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOutletPageRoutingModule } from './view-outlet-routing.module';

import { ViewOutletPage } from './view-outlet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewOutletPageRoutingModule
  ],
  declarations: [ViewOutletPage]
})
export class ViewOutletPageModule {}
