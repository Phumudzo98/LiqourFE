import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SigninPage } from './signin.page';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { OtpServiceService } from 'src/app/util/service/otp-service.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Auth } from 'src/app/util/service/Auth';
import { HelperService } from 'src/app/util/service/helper.service';
import { DataService } from 'src/app/util/service/data.service';


describe('SigninPage', () => {
  let component: SigninPage;
  let fixture: ComponentFixture<SigninPage>;
  let otpService: jasmine.SpyObj<OtpServiceService>;
  let log :jasmine.SpyObj<SigninPage>

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [SigninPage],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]), 
        IonicModule.forRoot(), 
        CommonModule, 
        HttpClientModule
      ],
      providers: [
        NgxSpinnerService,
        OtpServiceService ,
        Auth,
        HelperService,
        DataService,
        SigninPage
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
  it('should check if control names contain something', () =>
  {
    const emailContr = component.loginForm.get('email');
    expect(emailContr).toBeTruthy()
    emailContr?.setValue("Andrew.King")
    expect(emailContr?.value).toBeTruthy();

    const passwordContr = component.loginForm.get('password');
    expect(passwordContr).toBeTruthy()
    passwordContr?.setValue("yfdsdcgdg")
    expect(passwordContr?.value).toBeTruthy();

    component.login()
    otpService.getOneTimePin

    expect(component.otp).toBeTruthy()

  })

 

 
}



);
