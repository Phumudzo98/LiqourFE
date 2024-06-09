import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOutletPageRoutingModule } from './view-outlet-routing.module';

import { ViewOutletPage } from './view-outlet.page';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewOutletPageRoutingModule,
    MenuFooterPageModule
  ],
  declarations: [ViewOutletPage]
})
export class ViewOutletPageModule {}
