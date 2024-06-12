import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutletEditProfilePageRoutingModule } from './outlet-edit-profile-routing.module';

import { OutletEditProfilePage } from './outlet-edit-profile.page';
import { OutletMenuFooterPageModule } from 'src/app/outletHeaderFooter/outlet-menu-footer/outlet-menu-footer.module';
import { OutlethaederPageModule } from 'src/app/outletHeaderFooter/outlethaeder/outlethaeder.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutletEditProfilePageRoutingModule,
    OutletMenuFooterPageModule,
    OutlethaederPageModule
  ],
  declarations: [OutletEditProfilePage]
})
export class OutletEditProfilePageModule {}
