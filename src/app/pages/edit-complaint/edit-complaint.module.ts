import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditComplaintPageRoutingModule } from './edit-complaint-routing.module';

import { EditComplaintPage } from './edit-complaint.page';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
import { NgxSpinnerModule } from 'ngx-spinner';``
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditComplaintPageRoutingModule,
    MenuFooterPageModule,
    NgxSpinnerModule.forRoot()
  ],
  declarations: [EditComplaintPage]
})
export class EditComplaintPageModule {}
