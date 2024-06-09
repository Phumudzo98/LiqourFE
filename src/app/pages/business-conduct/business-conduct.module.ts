import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessConductPageRoutingModule } from './business-conduct-routing.module';

import { BusinessConductPage } from './business-conduct.page';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessConductPageRoutingModule,
    MenuFooterPageModule
  ],
  declarations: [BusinessConductPage]
})
export class BusinessConductPageModule {}
