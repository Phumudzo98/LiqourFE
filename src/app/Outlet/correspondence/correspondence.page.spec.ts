import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CorrespondencePage } from './correspondence.page';

describe('CorrespondencePage', () => {
  let component: CorrespondencePage;
  let fixture: ComponentFixture<CorrespondencePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrespondencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
