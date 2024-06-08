import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigateToOutletPage } from './navigate-to-outlet.page';

describe('NavigateToOutletPage', () => {
  let component: NavigateToOutletPage;
  let fixture: ComponentFixture<NavigateToOutletPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigateToOutletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
