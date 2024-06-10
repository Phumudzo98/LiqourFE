import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewImagePage } from './view-image.page';

describe('ViewImagePage', () => {
  let component: ViewImagePage;
  let fixture: ComponentFixture<ViewImagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
