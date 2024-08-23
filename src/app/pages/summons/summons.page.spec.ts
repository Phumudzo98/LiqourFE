import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SummonsPage } from './summons.page';

describe('SummonsPage', () => {
  let component: SummonsPage;
  let fixture: ComponentFixture<SummonsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SummonsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
