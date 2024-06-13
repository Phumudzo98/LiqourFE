import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecialEventInspectionsPage } from './special-event-inspections.page';

describe('SpecialEventInspectionsPage', () => {
  let component: SpecialEventInspectionsPage;
  let fixture: ComponentFixture<SpecialEventInspectionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialEventInspectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
