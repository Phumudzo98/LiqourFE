import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThankYou2Page } from './thank-you-2.page';

describe('ThankYou2Page', () => {
  let component: ThankYou2Page;
  let fixture: ComponentFixture<ThankYou2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ThankYou2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
