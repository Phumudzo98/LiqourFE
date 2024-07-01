import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { IonInput, LoadingController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from 'src/app/util/service/Auth';
import { HelperService } from 'src/app/util/service/helper.service';
import { OtpServiceService } from 'src/app/util/service/otp-service.service';
import { DataService } from 'src/app/util/service/data.service';




@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit{
  otp: string[] = ['', '', '', ''];
  email: string = ''; // Add the email property

  @ViewChildren('otpInput') otpInputs!: QueryList<IonInput>;
  alertType!: string;
  alertMessage!: string;
  showAlert!: boolean;
  enteredOtp: string=''; 
  

  


  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private auth: Auth,
    private helper:HelperService,
    private service: OtpServiceService
   
    
  ) {}

  sharedData: string='';

  myOtp:any;

  ngOnInit() {



    // Read email from query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
    });

    this.sharedData = this.dataService.getData();
    
    this.myOtp=localStorage.getItem('otp');
   
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
    }, 2000); // Disable the message after 2 seconds
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

    console.log(localStorage.getItem('otp'));
    this.enteredOtp = this.otp.join('');
 
    this.auth.otp = this.enteredOtp; 

    let username = localStorage.getItem('username');
    

    this.auth.username = (username !== null && username !== undefined) ? username.toString() : '';

    this.service.validateOTP(this.auth).subscribe({
      next: (res:any) => {
        //this.spinner.hide();
        
        this.router.navigate(['/dashboard']);

        this.helper.setToken(res.message)
        this.helper.setSimpToken(res.message);

       
      }, error: (error: any) => {
        
        /*Swal.fire({position: 'center',
        icon: 'error',
        text: message.message,
        title: message.success,
        showConfirmButton: false,
        timer: 5000})*/
        //this.spinner.hide()
      }
    })
  }

  


}