import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavigateToOutletPageRoutingModule } from './navigate-to-outlet-routing.module';

import { NavigateToOutletPage } from './navigate-to-outlet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavigateToOutletPageRoutingModule
  ],
  declarations: [NavigateToOutletPage]
})
export class NavigateToOutletPageModule {}
