import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutletDashboardPageRoutingModule } from './outlet-dashboard-routing.module';

import { OutletDashboardPage } from './outlet-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutletDashboardPageRoutingModule
  ],
  declarations: [OutletDashboardPage]
})
export class OutletDashboardPageModule {}
