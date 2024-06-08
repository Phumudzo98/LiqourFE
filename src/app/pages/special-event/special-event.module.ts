import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialEventPageRoutingModule } from './special-event-routing.module';

import { SpecialEventPage } from './special-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialEventPageRoutingModule
  ],
  declarations: [SpecialEventPage]
})
export class SpecialEventPageModule {}
