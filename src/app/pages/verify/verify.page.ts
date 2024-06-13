import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  email: string = ""; 
  otp: string = "";
  toast: any; // Change the type to 'any' for the toast instance

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController 
  ) {}

  ngOnInit() {
    // Read email from query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
      this.setIpFocus();
    });
  }

  setIpFocus() {
    for (let i = 1; i <= 4; i++) {
      const element = document.getElementById('ip' + i);
      if (element) {
        if (i === this.otp.length + 1) {
          element.style.background = 'var(--ion-color-dark)';
        } else {
          element.style.background = 'var(--ion-color-light)';
        }
      }
    }
  }

  clear() {
    this.otp = "";
    this.setIpFocus();
  }

  back() {
    this.otp = this.otp.slice(0, -1);
    this.setIpFocus();
  }

  set(number: string) {
    if (this.otp.length < 4) {
      this.otp += number;
      this.setIpFocus();
    }
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Verifying OTP...',
      spinner: "circular"
    });
    await loading.present();
  }

  async presentToast(message: string, color: string) {
    this.toast = await this.toastCtrl.create({
      message: message,
      color: color,
      duration: 1000,
      position: "middle",
    });

    await this.toast.present();

    // Handle toast dismissal
    this.toast.onDidDismiss().then(() => {
      // Optional: Add any code you want to run after the toast is dismissed
    });
  }

  async checkOTP() {
    await this.presentLoading();
    setTimeout(async () => {
      await this.loadingCtrl.dismiss();
      if (this.otp === "1234") {
        //await this.presentToast("OTP Verified", "success");
        if (this.email === 'inspector@gmail.com') {
          this.router.navigate(['/dashboard']).then(() => {
            // Dismiss toast after navigation
            this.toast.dismiss();
          });
        } else if (this.email === 'outlet@gmail.com') {
          this.router.navigate(['/outlet-dashboard']).then(() => {
            // Dismiss toast after navigation
            this.toast.dismiss();
          });
        }
      } else {
        //await this.presentToast("Invalid OTP", "danger");
      }
    }, 2000);
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    if (key === 'Backspace') {
      this.back();
    } else if (!isNaN(Number(key)) && key !== ' ') {
      this.set(key);
    }
  }
}
