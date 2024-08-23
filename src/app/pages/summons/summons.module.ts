import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummonsPageRoutingModule } from './summons-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
import { MenuHeaderPageModule } from 'src/app/headerFooter/menu-header/menu-header.module';

import { SummonsPage } from './summons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummonsPageRoutingModule,
    NgxSpinnerModule,
    MenuFooterPageModule,
    MenuHeaderPageModule
  ],
  declarations: [SummonsPage]
})
export class SummonsPageModule {}
