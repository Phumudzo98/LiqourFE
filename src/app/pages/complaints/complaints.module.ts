import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComplaintsPageRoutingModule } from './complaints-routing.module';

import { ComplaintsPage } from './complaints.page';
import { MenuHeaderPageModule } from 'src/app/headerFooter/menu-header/menu-header.module';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComplaintsPageRoutingModule,
    MenuFooterPageModule,
    MenuHeaderPageModule,
    NgxSpinnerModule.forRoot()
  ],
  declarations: [ComplaintsPage]
})
export class ComplaintsPageModule {}
