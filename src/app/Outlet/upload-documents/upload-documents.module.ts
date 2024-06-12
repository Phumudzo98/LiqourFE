import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadDocumentsPageRoutingModule } from './upload-documents-routing.module';

import { UploadDocumentsPage } from './upload-documents.page';
import { OutletMenuFooterPageModule } from 'src/app/outletHeaderFooter/outlet-menu-footer/outlet-menu-footer.module';
import { OutlethaederPageModule } from 'src/app/outletHeaderFooter/outlethaeder/outlethaeder.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadDocumentsPageRoutingModule,
    OutletMenuFooterPageModule,
    OutlethaederPageModule
  ],
  declarations: [UploadDocumentsPage]
})
export class UploadDocumentsPageModule {}
