import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThankYou2PageRoutingModule } from './thank-you-2-routing.module';

import { ThankYou2Page } from './thank-you-2.page';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThankYou2PageRoutingModule,
    MenuFooterPageModule
  ],
  declarations: [ThankYou2Page]
})
export class ThankYou2PageModule {}
