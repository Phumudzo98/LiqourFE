import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectorPageRoutingModule } from './inspector-routing.module';

import { InspectorPage } from './inspector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspectorPageRoutingModule
  ],
  declarations: [InspectorPage]
})
export class InspectorPageModule {}
