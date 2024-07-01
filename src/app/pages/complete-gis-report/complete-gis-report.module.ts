import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxSpinner } from 'ngx-spinner';

import { CompleteGisReportPageRoutingModule } from './complete-gis-report-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CompleteGisReportPage } from './complete-gis-report.page';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteGisReportPageRoutingModule,
    ReactiveFormsModule,
    MenuFooterPageModule,
    NgxSpinnerModule
  ],
  declarations: [CompleteGisReportPage]
})
export class CompleteGisReportPageModule {}
