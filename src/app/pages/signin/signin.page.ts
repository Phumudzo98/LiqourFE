import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { OtpServiceService } from 'src/app/util/service/otp-service.service';
import { HelperService } from 'src/app/util/service/helper.service';
import { Auth } from 'src/app/util/service/Auth';
import { Message } from 'src/app/util/service/Message';
import { DataService } from 'src/app/util/service/data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  loginForm: FormGroup;
  otp: any;
  getotp: string = '';
  alertType!: string;
  alertMessage!: string;
  showAlert!: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: OtpServiceService,
    private helper: HelperService,
    private auth: Auth,
    private dataService: DataService,
    private spinner: NgxSpinnerService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  email: string = '';
  password: string = '';

  public login(): void {
    if (this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    this.email = this.loginForm.get('email')?.value;
    this.password = this.loginForm.get('password')?.value;

    if (!this.email) {
      console.error('Email is undefined or empty');
      return;
    }
    else if(this.email.includes('@'))
    {
      alert("Not authorized")
      return;
    }

    this.spinner.show();
    this.auth.username = this.email;

   
    setTimeout(() => {
      this.getOpt();
      
   
    }, 2000); 


  }

  private getOpt(): void {

    const auth2 = {
      username: this.email,
      otp: this.loginForm.get('enteredOtp')?.value,
    };

    this.service.getOneTimePin(auth2).subscribe({
      next: (res: any) => {


        if(this.auth.username=="financial")
          {
            this.router.navigate(['/outlet-dashboard']);
          }
          else{
            localStorage.removeItem('isLoggedOut'); // User is now logged in
           
          

        let message = new Message();
        message.message = 'We have sent OTP to your email';
        this.otp = res.message;
        this.getotp = res.message;

        this.saveData();

        localStorage.setItem('username', this.email);
        localStorage.setItem('otp', this.getotp);

        // Hide spinner after OTP retrieval
        setTimeout(() => {

          this.spinner.hide();
          this.router.navigateByUrl('/verify');
          this.loginForm.reset();
        }, 2000); 

      }
      },
      error: (error: any) => {

        console.error('Error fetching OTP:', error);
        
        this.spinner.hide();

        let errorMessage = 'Invalid email.';

        if (error.status === 0) {
          errorMessage = 'Network error. Please check your internet connection.';
        }
        this.showAlertMessage('error', errorMessage);
      }
    });

  }

  saveData() {
    this.dataService.setData(this.getotp);
  }

  showAlertMessage(type: string, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000); 
  }
  toRegister() {

    this.spinner.show(); 
  
    setTimeout(() => {
      this.spinner.hide(); 
      this.router.navigate(['register-user']);
    }, 2000);
  }

  toPassword() {
    this.spinner.show(); 
  
    setTimeout(() => {
      this.spinner.hide(); 
      this.router.navigate(['forgot-password']);
    }, 2000);
  }
}