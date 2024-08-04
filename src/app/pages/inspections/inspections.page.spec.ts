import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InspectionsPage } from './inspections.page';

describe('InspectionsPage', () => {
  let component: InspectionsPage;
  let fixture: ComponentFixture<InspectionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
