import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private spinner: NgxSpinnerService) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, this.fullNameValidator]],
      email: ['', [Validators.required, Validators.email]],
      idNumber: ['', [Validators.required, this.idNumberValidator, this.idNumberLengthValidator]],
      mobileNo: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: this.MustMatch('password', 'confirmPassword'),
    });
    
  }

  ngOnInit() {}

  toLogin(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(['signin']);
    }, 2000);
  }

  //ID Number Validator
  idNumberValidator(control: AbstractControl): ValidationErrors | null {
    const idNumber = control.value;
    const errors: ValidationErrors = {};
  
    if (!/^[0-9]+$/.test(idNumber)) {
      errors['idNumberInvalidCharacters'] = true;
    }
    return Object.keys(errors).length ? errors : null;
  }

  //ID Number Length
  idNumberLengthValidator(control: AbstractControl): ValidationErrors | null {
    const idNumber = control.value;
    const errors: ValidationErrors = {};
  
    if (idNumber.length !== 13) {
      errors['idNumberLength'] = true;
    }
    return Object.keys(errors).length ? errors : null;
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

     //No special Characters on fullName
              // Full Name Validator
        fullNameValidator(control: AbstractControl): ValidationErrors | null {
          const fullName = control.value;
        const errors: ValidationErrors = {};

        if (!/^[a-zA-Z\s]+$/.test(fullName)) {
        errors['fullNameInvalidCharacters'] = true;
        }
        return Object.keys(errors).length ? errors : null;
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
  

  get register() { return this.registerForm.controls; }
}
