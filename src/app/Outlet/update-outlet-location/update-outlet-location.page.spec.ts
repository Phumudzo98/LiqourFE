import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateOutletLocationPage } from './update-outlet-location.page';

describe('UpdateOutletLocationPage', () => {
  let component: UpdateOutletLocationPage;
  let fixture: ComponentFixture<UpdateOutletLocationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOutletLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
