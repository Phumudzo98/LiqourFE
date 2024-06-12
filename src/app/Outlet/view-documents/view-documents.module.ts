import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDocumentsPageRoutingModule } from './view-documents-routing.module';

import { ViewDocumentsPage } from './view-documents.page';
import { OutletMenuFooterPageModule } from 'src/app/outletHeaderFooter/outlet-menu-footer/outlet-menu-footer.module'; 
import { OutlethaederPageModule } from 'src/app/outletHeaderFooter/outlethaeder/outlethaeder.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDocumentsPageRoutingModule,
    OutletMenuFooterPageModule,
    OutlethaederPageModule
  ],
  declarations: [ViewDocumentsPage]
})
export class ViewDocumentsPageModule {}
