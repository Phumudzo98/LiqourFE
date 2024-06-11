import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutletEditProfilePage } from './outlet-edit-profile.page';

describe('OutletEditProfilePage', () => {
  let component: OutletEditProfilePage;
  let fixture: ComponentFixture<OutletEditProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletEditProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
