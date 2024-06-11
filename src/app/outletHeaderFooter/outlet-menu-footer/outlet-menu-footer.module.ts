import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutletMenuFooterPageRoutingModule } from './outlet-menu-footer-routing.module';

import { OutletMenuFooterPage } from './outlet-menu-footer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutletMenuFooterPageRoutingModule
  ],
  declarations: [OutletMenuFooterPage]
})
export class OutletMenuFooterPageModule {}
