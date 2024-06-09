import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavigateToOutletPageRoutingModule } from './navigate-to-outlet-routing.module';

import { NavigateToOutletPage } from './navigate-to-outlet.page';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
import { MenuHeaderPageModule } from 'src/app/headerFooter/menu-header/menu-header.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavigateToOutletPageRoutingModule,
    MenuFooterPageModule,
    MenuHeaderPageModule
  ],
  declarations: [NavigateToOutletPage]
})
export class NavigateToOutletPageModule {}
