import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  password!: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  
  email: string = "";
  email2: string = "mkay2@gmail.com";


  sign() {
    // Your sign-in logic here
    if (this.email === 'inspector@gmail.com' && this.password === 'admin123') {
      this.router.navigate(['/verify'], { queryParams: { email: this.email } });
    } else if (this.email === 'outlet@gmail.com' && this.password === 'admin123') {
      this.router.navigate(['/verify'], { queryParams: { email: this.email } });
    } else {
      alert('Sign-in failed');
    }
  }

}
