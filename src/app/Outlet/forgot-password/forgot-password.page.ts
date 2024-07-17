import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  passwordForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService) {
    this.passwordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },  
    {
      validators: this.MustMatch('password', 'confirmPassword'),
    });
  }

  ngOnInit() {
  }

    /*Password mismatched*/
    MustMatch( password:any, confirmPassword:any)
    {
     return(formGroup: FormGroup)=>{
       const passwordcontrol = formGroup.controls[password];
       const confirm_passwordcontrol = formGroup.controls[confirmPassword];
 
       if(confirm_passwordcontrol.errors && !confirm_passwordcontrol.errors['MustMatch']){
         return;
       }
       if(passwordcontrol.value !== confirm_passwordcontrol.value)
       {
         confirm_passwordcontrol.setErrors({'MustMatch': true});
       }
       else{
         confirm_passwordcontrol.setErrors(null);
       }
 
     }
    }

    //Submitting a form
    onSubmit()
    {
     this.spinner.show(); 
 
     setTimeout(() => {
       this.spinner.hide(); 
     }, 2000);

     console.log("Loading");
   
    }
    get reset() { return this.passwordForm.controls; }


}
