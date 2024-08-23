import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Page2PageRoutingModule } from './page-2-routing.module';

import { Page2Page } from './page-2.page';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Page2PageRoutingModule,
    NgxSpinnerModule.forRoot(),
     ReactiveFormsModule

  ],
  declarations: [Page2Page]
})
export class Page2PageModule {}
