import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressesPageRoutingModule } from './addresses-routing.module';

import { AddressesPage } from './addresses.page';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressesPageRoutingModule,
    MenuFooterPageModule
  ],
  declarations: [AddressesPage]
})
export class AddressesPageModule {}
