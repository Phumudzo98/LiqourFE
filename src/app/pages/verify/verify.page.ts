import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonInput, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage {
  otp: string[] = ['', '', '', ''];
  email: string = ''; // Add the email property

  @ViewChildren('otpInput') otpInputs!: QueryList<IonInput>;
  alertType!: string;
  alertMessage!: string;
  showAlert!: boolean;

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private toastCtrl: ToastController,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    // Read email from query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
     
    });
  }


  handleKeydown(event: KeyboardEvent, currentIndex: number) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace') {
      if (this.otp[currentIndex] === '' && currentIndex > 0) {
        const prevInput = this.otpInputs.toArray()[currentIndex - 1];
        if (prevInput) {
          this.otp[currentIndex - 1] = ''; // Clear the previous input
          prevInput.setFocus();
        }
      } else {
        this.otp[currentIndex] = ''; // Clear the current input
      }
    }
  }

  focusNext(event: KeyboardEvent, nextIndex: number) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && nextIndex < this.otp.length) {
      const nextInput = this.otpInputs.toArray()[nextIndex];
      if (nextInput) {
        nextInput.setFocus();
      }
    }
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Verifying OTP...',
      spinner: 'circular'
    });
    await loading.present();
  }

  async checkOTP() {
    await this.presentLoading();
    setTimeout(async () => {
      await this.loadingCtrl.dismiss();
      const otpCode = this.otp.join('');
      if (otpCode === '1234') {
        if (this.email === 'inspector@gmail.com') {
          this.router.navigate(['/dashboard']).then(() => {
            this.resetOTP();
          });
        } else if (this.email === 'outlet@gmail.com') {
          this.router.navigate(['/outlet-dashboard']).then(() => {
            this.resetOTP();
          });
        }
      } else {
        this.showAlertMessage('danger', 'Invalid OTP');
      }
    }, 2000);
  }

  showAlertMessage(type: string, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 2000); // Disable the message after 2 seconds
  }

  resetOTP() {
    this.otp = ['', '', '', ''];
    this.otpInputs.first.setFocus(); // Focus the first input field
  }
}