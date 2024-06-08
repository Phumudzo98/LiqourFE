import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecialEventPage } from './special-event.page';

describe('SpecialEventPage', () => {
  let component: SpecialEventPage;
  let fixture: ComponentFixture<SpecialEventPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
