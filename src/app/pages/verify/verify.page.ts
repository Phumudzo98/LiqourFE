import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IonInput, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/util/service/Auth';
import { HelperService } from 'src/app/util/service/helper.service';
import { OtpServiceService } from 'src/app/util/service/otp-service.service';
import { DataService } from 'src/app/util/service/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  otp: string[] = ['', '', '', ''];
  email: string = '';
  @ViewChildren('otpInput') otpInputs!: QueryList<IonInput>;
  alertType!: string;
  alertMessage!: string;
  showAlert!: boolean;
  enteredOtp: string = '';
  isFirstLogin: boolean = false;
  sharedData: string='';
  myOtp: any;

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private auth: Auth,
    private helper: HelperService,
    private service: OtpServiceService,
    private spinner: NgxSpinnerService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();

    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
      this.isFirstLogin = params['firstLogin'] === 'true';
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
          this.otp[currentIndex - 1] = '';
          prevInput.setFocus();
        }
      } else {
        this.otp[currentIndex] = '';
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
      spinner: 'circular',
    });
    await loading.present();
  }

  showAlertMessage(type: string, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  public async submitOTP(): Promise<void> {
    this.spinner.show();
    this.enteredOtp = this.otp.join('');
    this.auth.otp = this.enteredOtp;

    let username = localStorage.getItem('username');
    this.auth.username = username ? username.toString() : '';

    this.service.validateOTP(this.auth).subscribe({
      next: async (res: any) => {
        this.helper.setToken(res.message);
        localStorage.setItem('userToken', res.message);
        this.helper.setSimpToken(res.message);

        setTimeout(async () => {
          this.spinner.hide();
          if (this.isFirstLogin) {
            await this.router.navigate(['/pin-creation']);
          } else {
            await this.router.navigate(['/dashboard']);
          }
        }, 2000);
      },
      error: (error: any) => {
        console.error('Error validating OTP:', error);
        setTimeout(() => {
          this.spinner.hide();
          let errorMessage = 'Invalid OTP';
          this.showAlertMessage('error', errorMessage);
        }, 2000);
      },
    });
  }
}
