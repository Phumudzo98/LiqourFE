import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentHistoryPageRoutingModule } from './payment-history-routing.module';

import { PaymentHistoryPage } from './payment-history.page';
import { OutletMenuFooterPageModule } from 'src/app/outletHeaderFooter/outlet-menu-footer/outlet-menu-footer.module';
import { OutlethaederPageModule } from 'src/app/outletHeaderFooter/outlethaeder/outlethaeder.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentHistoryPageRoutingModule,
    OutletMenuFooterPageModule,
    OutlethaederPageModule
  ],
  declarations: [PaymentHistoryPage]
})
export class PaymentHistoryPageModule {}
