import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutletEditProfilePageRoutingModule } from './outlet-edit-profile-routing.module';

import { OutletEditProfilePage } from './outlet-edit-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutletEditProfilePageRoutingModule
  ],
  declarations: [OutletEditProfilePage]
})
export class OutletEditProfilePageModule {}
