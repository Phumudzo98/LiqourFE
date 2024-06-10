import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewComplaintPageRoutingModule } from './view-complaint-routing.module';

import { ViewComplaintPage } from './view-complaint.page';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
import { MenuFooterPage } from 'src/app/headerFooter/menu-footer/menu-footer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewComplaintPageRoutingModule,
    MenuFooterPageModule
  ],
  declarations: [ViewComplaintPage]
})
export class ViewComplaintPageModule {}
