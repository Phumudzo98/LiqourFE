import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateGisPageRoutingModule } from './update-gis-routing.module';

import { UpdateGisPage } from './update-gis.page';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
import { MenuHeaderPageModule } from 'src/app/headerFooter/menu-header/menu-header.module';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateGisPageRoutingModule,
    MenuFooterPageModule,
    MenuHeaderPageModule,
    NgxSpinnerModule.forRoot() // Import NgxSpinnerModule here
  ],
  declarations: [UpdateGisPage]
})
export class UpdateGisPageModule {}
