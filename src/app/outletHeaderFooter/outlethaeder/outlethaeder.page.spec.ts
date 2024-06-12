import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutlethaederPage } from './outlethaeder.page';

describe('OutlethaederPage', () => {
  let component: OutlethaederPage;
  let fixture: ComponentFixture<OutlethaederPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlethaederPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
