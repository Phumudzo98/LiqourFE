import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CompleteInspectionPageRoutingModule } from './complete-inspection-routing.module';

import { CompleteInspectionPage } from './complete-inspection.page';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteInspectionPageRoutingModule,
    MenuFooterPageModule,
    ReactiveFormsModule
  ],
  declarations: [CompleteInspectionPage]
})
export class CompleteInspectionPageModule {}
