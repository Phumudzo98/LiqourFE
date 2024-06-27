import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ViewImagePageModule } from './pages/view-image/view-image.module';
import { MenuController } from '@ionic/angular';  // Import MenuControlle
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Import this
import { IonicStorageModule } from '@ionic/storage-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpRequestInterceptor } from './util/service/interceptor';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { NgClass } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot({
      animated: false 
    }),
    AppRoutingModule,
    ViewImagePageModule,
    NoopAnimationsModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    
    
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ModalController ,// Add ModalController to the providers array
    ScreenOrientation,
    MenuController, { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }, provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
