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

    this.auth.username = this.email;
    const encodedPassword = encodeURIComponent(this.password);

    // Show spinner when login button is clicked
    this.spinner.show();

    // Simulate OTP retrieval delay
    setTimeout(() => {
      this.getOpt();
    }, 2000); // Simulating a 2-second delay before OTP retrieval
  }

  private getOpt(): void {
    const auth2 = {
      username: this.email,
      otp: this.loginForm.get('enteredOtp')?.value,
    };

    this.service.getOneTimePin(auth2).subscribe({
      next: (res: any) => {
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
        }, 2000); // Hide spinner after 2 seconds
      },
      error: (error: any) => {
        console.error('Error fetching OTP:', error);
        setTimeout(() => {
          this.spinner.hide();
        }, 2000); // Hide spinner after 2 seconds
      },
    });
  }

  saveData() {
    this.dataService.setData(this.getotp);
  }
}
