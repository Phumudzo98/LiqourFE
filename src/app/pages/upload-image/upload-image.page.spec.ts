import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadImagePage } from './upload-image.page';

describe('UploadImagePage', () => {
  let component: UploadImagePage;
  let fixture: ComponentFixture<UploadImagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
