import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutletMenuFooterPage } from './outlet-menu-footer.page';

describe('OutletMenuFooterPage', () => {
  let component: OutletMenuFooterPage;
  let fixture: ComponentFixture<OutletMenuFooterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletMenuFooterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
