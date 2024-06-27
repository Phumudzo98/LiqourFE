import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTasksPageRoutingModule } from './my-tasks-routing.module';

import { MyTasksPage } from './my-tasks.page';
import { MenuHeaderPageModule } from 'src/app/headerFooter/menu-header/menu-header.module';
import { MenuFooterPageModule } from 'src/app/headerFooter/menu-footer/menu-footer.module';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTasksPageRoutingModule,
    MenuFooterPageModule,
    MenuHeaderPageModule,
    NgxSpinnerModule.forRoot() // Import NgxSpinnerModule here
  ],
  declarations: [MyTasksPage]
})
export class MyTasksPageModule {}
