import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentDetailsPage } from './payment-details.page';

describe('PaymentDetailsPage', () => {
  let component: PaymentDetailsPage;
  let fixture: ComponentFixture<PaymentDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
