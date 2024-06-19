import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  getotp:string='';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: OtpServiceService,
    private helper: HelperService,
    private auth: Auth,
    private dataService: DataService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  public login(): void {
    //console.log('Form Value:', this.loginForm.value);

    if (this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;

    

    if (!email) {
      console.error('Email is undefined or empty');
      return;
    }

    

    this.auth.username =email; 
    const encodedPassword = encodeURIComponent(password);

    let host = this.helper.getHost();

    console.log(this.getOpt());

    if (!host) {
      
      this.router.navigate(['/verify']);
    } else {
      console.log(this.getOpt());
     
    }
  }

  // public submitOTP(): void {
  //   this.auth.otp = this.loginForm.get('enteredOtp')?.value;
  //   this.service.validateOTP(this.auth).subscribe({
  //     next: (res: any) => {
  //       this.helper.storeToken(res.message);
  //       this.router.navigateByUrl('/inbox');
  //     },
  //     error: (error: any) => {
  //       // Handle error
  //     },
  //   });
  // }

  private getOpt(): void {
    this.auth.otp = this.loginForm.get('enteredOtp')?.value;
    this.service.getOneTimePin(this.auth).subscribe({
      next: (res: any) => {
        let message = new Message();
        message.message = 'We have sent OTP to your email';
        this.otp = res.message;
        this.getotp=res.message;

        console.log(this.getotp)
        this.saveData();
       
        localStorage.setItem('username', 'Takalani.Mukwevho')
        localStorage.setItem('otp',this.getotp);

      },
      error: (error: any) => {
        // Handle error
      },
    });
  }

  saveData() {
    this.dataService.setData(this.getotp);
  }
}
