import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditComplaint2PageRoutingModule } from './edit-complaint2-routing.module';

import { EditComplaint2Page } from './edit-complaint2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditComplaint2PageRoutingModule
  ],
  declarations: [EditComplaint2Page]
})
export class EditComplaint2PageModule {}
