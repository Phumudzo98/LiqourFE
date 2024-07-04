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

    // Check if the user is on the signin or verification page
    const isSignInOrVerification = currentRoute.includes('/signin') || currentRoute.includes('/verify')||currentRoute.includes('/thank-you');

    if (isLoggedOut || isSignInOrVerification) {
      localStorage.setItem('pendingAlert', JSON.stringify({ header, message }));
      return; // Do not show alert if the user is logged out or on signin/verification page
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