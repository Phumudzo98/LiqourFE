import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteInspectionPageRoutingModule } from './complete-inspection-routing.module';

import { CompleteInspectionPage } from './complete-inspection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteInspectionPageRoutingModule
  ],
  declarations: [CompleteInspectionPage]
})
export class CompleteInspectionPageModule {}
