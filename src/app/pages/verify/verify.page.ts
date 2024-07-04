import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonInput, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/util/service/Auth';
import { HelperService } from 'src/app/util/service/helper.service';
import { OtpServiceService } from 'src/app/util/service/otp-service.service';
import { DataService } from 'src/app/util/service/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage-angular';
import { AlertService } from 'src/app/util/service/services/alert.service';
//import { Network } from '@capacitor/network';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  otp: string[] = ['', '', '', ''];
  email: string = ''; // Add the email property

  @ViewChildren('otpInput') otpInputs!: QueryList<IonInput>;
  alertType!: string;
  alertMessage!: string;
  showAlert!: boolean;
  enteredOtp: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private auth: Auth,
    private helper: HelperService,
    private service: OtpServiceService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
  ) {}

  sharedData: string = '';

  myOtp: any;

  ngOnInit() {
    // Read email from query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
    });

    this.sharedData = this.dataService.getData();
    this.myOtp = localStorage.getItem('otp');
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

  showAlertMessage(type: string, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000); // Disable the message after 3 seconds
  }

  resetOTP() {
    this.otp = ['', '', '', ''];
    this.otpInputs.first.setFocus(); // Focus the first input field
  }

  // Add this method to dynamically change the active state color
  changeActiveColor(input: IonInput) {
    input.color = 'black';
  }

  public submitOTP(): void {
    this.spinner.show();
    console.log(localStorage.getItem('otp'));
    this.enteredOtp = this.otp.join('');

    this.auth.otp = this.enteredOtp;

    let username = localStorage.getItem('username');
    this.auth.username = (username !== null && username !== undefined) ? username.toString() : '';

    this.service.validateOTP(this.auth).subscribe({
      next: (res: any) => {
        if(this.auth.username=="financial")
          {
            this.router.navigate(['/outlet-dashboard']);
          }
          else{
            localStorage.removeItem('isLoggedOut'); // User is now logged in
            this.router.navigate(['/dashboard']);
          }
       
        this.helper.setToken(res.message);
        localStorage.setItem('userToken', res.message);
        this.helper.setSimpToken(res.message);
  
        // Hide spinner after 2 seconds
        setTimeout(() => {
          this.spinner.hide();
          //this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error: any) => {
        console.error('Error validating OTP:', error);

        setTimeout(() => {
          this.spinner.hide();
          let errorMessage = 'Invalid OTP';
          this.showAlertMessage('error', errorMessage);
        }, 2000);
      }
    });
  }
}
