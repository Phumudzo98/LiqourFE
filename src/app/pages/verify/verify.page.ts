import { Component, ViewChild } from '@angular/core';
import { IonInput, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage {
  OTP: string[] = ['', '', '', '']; // Array to store OTP digits
  email: string = ''; // Set the email for testing

  @ViewChild('otp1', { static: false }) otp1!: IonInput;
  @ViewChild('otp2', { static: false }) otp2!: IonInput;
  @ViewChild('otp3', { static: false }) otp3!: IonInput;
  @ViewChild('otp4', { static: false }) otp4!: IonInput;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
      this.otp1.setFocus();
    });
  }

  otpController(event: any, index: number) {
    const key = event.key;

    if (key === 'Backspace') {
      if (this.OTP[index].length === 0 && index > 0) {
        this.setFocus(index - 1); // Move focus to the previous input
      } else {
        this.OTP[index] = ''; // Clear the digit in the current input
        this.setFocus(index); // Keep focus on the current input
      }
    } else if (!isNaN(Number(key)) && key !== ' ' && index < 4) {
      this.OTP[index] = key; // Update the OTP with the entered digit
      if (index < 3) {
        this.setFocus(index + 1); // Move focus to the next input
      }
    }
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Verifying OTP...',
      spinner: 'circular',
    });
    await loading.present();
  }

  async presentToast(message: string, color: string, customClass: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      duration: 1000,
      position: 'middle',
      cssClass: customClass,
    });

    await toast.present();

    // Handle toast dismissal
    toast.onDidDismiss().then(() => {
      // Optional: Add any code you want to run after the toast is dismissed
    });
  }

  async checkOTP() {
    await this.presentLoading();
    setTimeout(async () => {
      await this.loadingCtrl.dismiss();
      if (this.OTP.join('') === '1234') { // Check the joined OTP string
        
        if (this.email === 'inspector@gmail.com') {
          this.router.navigate(['/dashboard']);
        } else if (this.email === 'outlet@gmail.com') {
          this.router.navigate(['/outlet-dashboard']);
        }
      } else {
        await this.presentToast('Invalid OTP', 'danger', 'custom-toast');
      }
    }, 2000);
  }

  private setFocus(index: number) {
    switch (index) {
      case 0: this.otp1.setFocus(); break;
      case 1: this.otp2.setFocus(); break;
      case 2: this.otp3.setFocus(); break;
      case 3: this.otp4.setFocus(); break;
      default: break;
    }
  }
}
