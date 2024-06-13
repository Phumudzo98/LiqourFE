import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  email: string = ''; 
  constructor(private router: Router, private activatedRoute: ActivatedRoute ) {}
 
  ngOnInit() {
     // Read email from query parameters
     this.activatedRoute.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  otp: string[] = ['', '', '', '']; 
  @ViewChildren('otpInput')
  otpInputs!: QueryList<ElementRef>;

  moveFocus(event: KeyboardEvent | undefined, index: number) {
    if (event && event.target instanceof HTMLInputElement) {
      const input = event.target as HTMLInputElement;
      if (input.value.length === 1 && index < this.otp.length - 1) {
        this.otpInputs.toArray()[index + 1].nativeElement.focus();
      } else if (input.value.length === 0 && index > 0 && event.key === 'Backspace') {
        this.otpInputs.toArray()[index - 1].nativeElement.focus();
      }
    }
  }

  // Assume verifyResult is a boolean indicating successful verification
  verify() {
    const enteredOTP = this.otp.join(''); // Combine the OTP digits into a string

    // Replace this with your actual OTP verification logic
    const verifyResult = this.verifyOTP(enteredOTP);

    if (verifyResult) {
      if (this.email === 'inspector@gmail.com') {
        this.router.navigate(['/dashboard']);
      } else if (this.email === 'outlet@gmail.com') {
        this.router.navigate(['/outlet-dashboard']);
      }
    } else {
      alert('Verification failed');
    }
  }

  verifyOTP(userInput: string): boolean {
    const storedOTP = '1234'; // Example: Assume the stored OTP is '123456'

    // Check if the user input matches the stored OTP
    return userInput === storedOTP;
  }

  
}
