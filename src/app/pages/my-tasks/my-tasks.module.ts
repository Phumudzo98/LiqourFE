import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTasksPageRoutingModule } from './my-tasks-routing.module';

import { MyTasksPage } from './my-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTasksPageRoutingModule
  ],
  declarations: [MyTasksPage]
})
export class MyTasksPageModule {}
