import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ViewImagePageModule } from './pages/view-image/view-image.module';
import { SidemenuPageModule } from './pages/sidemenu/sidemenu.module';
@NgModule({
  declarations: [
    AppComponent,
    // Add other components here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ViewImagePageModule,
    SidemenuPageModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ModalController // Add ModalController to the providers array
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
