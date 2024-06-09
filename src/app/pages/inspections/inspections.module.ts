import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectionsPageRoutingModule } from './inspections-routing.module';

import { InspectionsPage } from './inspections.page';
import { MenuHeaderPageModule } from 'src/app/headerFooter/menu-header/menu-header.module';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspectionsPageRoutingModule,
    MenuFooterPageModule,
    MenuHeaderPageModule
  ],
  declarations: [InspectionsPage]
})
export class InspectionsPageModule {}
