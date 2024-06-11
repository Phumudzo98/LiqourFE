import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutletSettingsPage } from './outlet-settings.page';

describe('OutletSettingsPage', () => {
  let component: OutletSettingsPage;
  let fixture: ComponentFixture<OutletSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
