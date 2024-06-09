import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialEventPageRoutingModule } from './special-event-routing.module';

import { SpecialEventPage } from './special-event.page';
import { MenuHeaderPageModule } from 'src/app/headerFooter/menu-header/menu-header.module';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialEventPageRoutingModule,
    MenuFooterPageModule,
    MenuHeaderPageModule
  ],
  declarations: [SpecialEventPage]
})
export class SpecialEventPageModule {}
