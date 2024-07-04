import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private alertController: AlertController, private router: Router) {}

  async showAlert(header: string, message: string) {
    const isLoggedOut = localStorage.getItem('isLoggedOut');
    const currentRoute = this.router.url;

    
    const isSignInOrVerification = currentRoute.includes('/signin') || currentRoute.includes('/verify');

    if (isLoggedOut || isSignInOrVerification) {
      localStorage.setItem('pendingAlert', JSON.stringify({ header, message }));
      return; 
    }

    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async checkPendingAlert() {
    const pendingAlert = localStorage.getItem('pendingAlert');
    if (pendingAlert) {
      const { header, message } = JSON.parse(pendingAlert);
      localStorage.removeItem('pendingAlert');
      await this.showAlert(header, message);
    }
  }
}