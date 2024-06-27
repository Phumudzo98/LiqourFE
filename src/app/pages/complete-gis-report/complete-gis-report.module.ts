import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxSpinner } from 'ngx-spinner';

import { CompleteGisReportPageRoutingModule } from './complete-gis-report-routing.module';

import { CompleteGisReportPage } from './complete-gis-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompleteGisReportPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CompleteGisReportPage]
})
export class CompleteGisReportPageModule {}
