import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewDocumentsPageRoutingModule } from './view-documents-routing.module';

import { ViewDocumentsPage } from './view-documents.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewDocumentsPageRoutingModule
  ],
  declarations: [ViewDocumentsPage]
})
export class ViewDocumentsPageModule {}
