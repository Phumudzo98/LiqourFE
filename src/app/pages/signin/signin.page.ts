import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  email:string="";
  password!: string;

  constructor(private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  sign(){
    if(this.email === "mkay1@gmail.com")
      {
        this.router.navigate(['dashboard'])
      }
      else{
        this.router.navigate(['outlet-dashboard'])

      }
  }
}
