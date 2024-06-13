import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialEventInspectionsPageRoutingModule } from './special-event-inspections-routing.module';
import { SpecialEventInspectionsPage } from './special-event-inspections.page';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialEventInspectionsPageRoutingModule,
    MenuFooterPageModule
  ],
  declarations: [SpecialEventInspectionsPage]
})
export class SpecialEventInspectionsPageModule {}
