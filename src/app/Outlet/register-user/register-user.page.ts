import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      idNumber: ['', Validators.required],
      mobileNo: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
      
    })
   }

  ngOnInit() {
  }

  toLogin() {
    this.spinner.show(); 
  
    setTimeout(() => {
      this.spinner.hide(); 
      this.router.navigate(['signin']);
    }, 2000);
  }
  
  get register (){return this.registerForm.controls;}


}
