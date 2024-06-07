import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  otp: string[] = ['', '', '', '', '', ''];

  @ViewChildren('otpInput')
  otpInputs!: QueryList<ElementRef>;

  moveFocus(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < this.otp.length - 1) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    } else if (input.value.length === 0 && index > 0 && event.key === 'Backspace') {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  verifyOtp() {
    const otpCode = this.otp.join('');
    console.log('OTP Code:', otpCode);
    // Add your verification logic here
  }
}
