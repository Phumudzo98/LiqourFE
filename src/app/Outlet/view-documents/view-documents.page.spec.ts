import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewDocumentsPage } from './view-documents.page';

describe('ViewDocumentsPage', () => {
  let component: ViewDocumentsPage;
  let fixture: ComponentFixture<ViewDocumentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDocumentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
