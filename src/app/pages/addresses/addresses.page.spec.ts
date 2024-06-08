import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressesPage } from './addresses.page';

describe('AddressesPage', () => {
  let component: AddressesPage;
  let fixture: ComponentFixture<AddressesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
