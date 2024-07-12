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

  beforeEach(waitForAsync(() => {
    //const otpServiceSpy = jasmine.createSpyObj('OtpServiceService', ['getOneTimePin']);


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
        DataService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getOneTimePin and set a non-empty otp value', async () => {
    
    component.loginForm.setValue({ email: 'Zuko.Lizani', password: 'password' });
    spyOn(component, 'saveData');
    
    component.login();

    await fixture.whenStable();

    expect(component.otp).not.toBe(''); 
    expect(component.getotp).not.toBe(''); 
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
  })
}



);
