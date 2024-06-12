import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorrespondencePageRoutingModule } from './correspondence-routing.module';

import { CorrespondencePage } from './correspondence.page';
import { OutletMenuFooterPageModule } from 'src/app/outletHeaderFooter/outlet-menu-footer/outlet-menu-footer.module';
import { OutlethaederPageModule } from 'src/app/outletHeaderFooter/outlethaeder/outlethaeder.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorrespondencePageRoutingModule,
    OutletMenuFooterPageModule,
    OutlethaederPageModule
  ],
  declarations: [CorrespondencePage]
})
export class CorrespondencePageModule {}
