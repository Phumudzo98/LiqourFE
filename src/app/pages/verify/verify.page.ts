import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  OTP: string[] = ['', '', '', '']; // Array to store OTP digits
  toast: any; // Change the type to 'any' for the toast instance
  activeInput: number = 1; // Initialize activeInput to 1
  email: string = ''; // Set the email for testing

  @ViewChild('otp1', { static: false }) otp1!: IonInput; // Use ! to mark property as initialized later
  @ViewChild('otp2', { static: false }) otp2!: IonInput; // Use ! to mark property as initialized later
  @ViewChild('otp3', { static: false }) otp3!: IonInput; // Use ! to mark property as initialized later
  @ViewChild('otp4', { static: false }) otp4!: IonInput; // Use ! to mark property as initialized later

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Read email from query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
      this.setIpFocus();
    });
  }

  setIpFocus() {
    switch (this.activeInput) {
      case 1:
        this.otp1.setFocus();
        break;
      case 2:
        this.otp2.setFocus();
        break;
      case 3:
        this.otp3.setFocus();
        break;
      case 4:
        this.otp4.setFocus();
        break;
      default:
        break;
    }
  }

  clear() {
    this.OTP = ['', '', '', ''];
    this.activeInput = 1; // Reset to the first input
    this.setIpFocus();
  }

  back() {
    if (this.activeInput > 1) {
      this.activeInput--;
      this.OTP[this.activeInput - 1] = ''; // Clear the current input in OTP array
      this.setIpFocus();
    }
  }

  otpController(event: any) {
    const key = event.key;
    const activeIndex = this.activeInput - 1; // Adjust index to 0-based

    if (key === 'Backspace') {
      if (this.OTP[activeIndex]) {
        this.OTP[activeIndex] = ''; // Clear the current input
      } else if (this.activeInput > 1) {
        this.back();
      }
    } else if (!isNaN(Number(key)) && key !== ' ' && this.activeInput <= 4) {
      this.OTP[activeIndex] = key; // Update the OTP with the entered digit
      if (this.activeInput < 4) {
        this.activeInput++;
      }
      this.setIpFocus();
    }
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Verifying OTP...',
      spinner: 'circular',
    });
    await loading.present();
  }

  async presentToast(message: string, color: string) {
    this.toast = await this.toastCtrl.create({
      message: message,
      color: color,
      duration: 1000,
      position: 'middle',
    });

    await this.toast.present();
  }

  async checkOTP() {
    await this.presentLoading();
    setTimeout(async () => {
      await this.loadingCtrl.dismiss();
      if (this.OTP.join('') === '1234') { // Check the joined OTP string
     
        if (this.email === 'inspector@gmail.com') {
          this.router.navigate(['/dashboard']).then(() => {
            this.toast.dismiss();
          }).catch(err => {
          
          });
        } else if (this.email === 'outlet@gmail.com') {
          this.router.navigate(['/outlet-dashboard']).then(() => {
            this.toast.dismiss();
          }).catch(err => {
            
          });
        }
      } else {
        await this.presentToast("Invalid OTP", "danger");
      }
    }, 2000);
  }
}
