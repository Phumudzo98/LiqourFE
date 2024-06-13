import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  
  email: string = "";
  email2: string = "mkay2@gmail.com";


  sign(){
    if(this.email === "mkay1@gmail.com")
      {
        this.router.navigate(['outlet-dashboard'])
      }
      else{
        this.router.navigate(['dashboard'])
      }
  }

}
