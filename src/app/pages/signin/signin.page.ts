import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  email:string=''

  signin()
  {

    switch(this.email) {
      case "mkay1@gmail.com":
        this.router.navigate(['outlet-dashboard']);
        break;
      case "mkay2@gmail.com":
        this.router.navigate(['dashboard']);
        break;
      default:
        // Optional: handle cases where the email does not match any of the specified cases
        break;
    }
  }

}
