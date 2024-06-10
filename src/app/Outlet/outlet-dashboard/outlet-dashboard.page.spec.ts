import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutletDashboardPage } from './outlet-dashboard.page';

describe('OutletDashboardPage', () => {
  let component: OutletDashboardPage;
  let fixture: ComponentFixture<OutletDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
