import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteGisReportPage } from './complete-gis-report.page';

describe('CompleteGisReportPage', () => {
  let component: CompleteGisReportPage;
  let fixture: ComponentFixture<CompleteGisReportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteGisReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
