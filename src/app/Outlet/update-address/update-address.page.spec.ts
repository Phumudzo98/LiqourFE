import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateAddressPage } from './update-address.page';

describe('UpdateAddressPage', () => {
  let component: UpdateAddressPage;
  let fixture: ComponentFixture<UpdateAddressPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
