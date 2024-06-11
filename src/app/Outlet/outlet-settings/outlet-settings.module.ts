import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutletSettingsPageRoutingModule } from './outlet-settings-routing.module';

import { OutletSettingsPage } from './outlet-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutletSettingsPageRoutingModule
  ],
  declarations: [OutletSettingsPage]
})
export class OutletSettingsPageModule {}
