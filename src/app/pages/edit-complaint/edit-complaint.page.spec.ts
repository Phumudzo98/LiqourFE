import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditComplaintPage } from './edit-complaint.page';

describe('EditComplaintPage', () => {
  let component: EditComplaintPage;
  let fixture: ComponentFixture<EditComplaintPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComplaintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
