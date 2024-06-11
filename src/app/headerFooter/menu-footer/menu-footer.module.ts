import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuFooterPageRoutingModule } from './menu-footer-routing.module';
import { MenuFooterPage } from './menu-footer.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuFooterPageRoutingModule,
    
  ],
  declarations: [MenuFooterPage],
  exports:[MenuFooterPage]
})
export class MenuFooterPageModule {}
