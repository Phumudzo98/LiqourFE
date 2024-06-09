import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThankYouPageRoutingModule } from './thank-you-routing.module';

import { ThankYouPage } from './thank-you.page';
import { MenuHeaderPageModule } from 'src/app/headerFooter/menu-header/menu-header.module';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThankYouPageRoutingModule,
    MenuFooterPageModule
  ],
  declarations: [ThankYouPage]
})
export class ThankYouPageModule {}
