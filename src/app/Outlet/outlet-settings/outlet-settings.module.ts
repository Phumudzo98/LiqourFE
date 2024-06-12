import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutletSettingsPageRoutingModule } from './outlet-settings-routing.module';

import { OutletSettingsPage } from './outlet-settings.page';
import { OutletMenuFooterPageModule } from 'src/app/outletHeaderFooter/outlet-menu-footer/outlet-menu-footer.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutletSettingsPageRoutingModule,
   OutletMenuFooterPageModule
  ],
  declarations: [OutletSettingsPage]
})
export class OutletSettingsPageModule {}
