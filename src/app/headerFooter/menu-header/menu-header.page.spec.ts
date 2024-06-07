import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuHeaderPage } from './menu-header.page';

describe('MenuHeaderPage', () => {
  let component: MenuHeaderPage;
  let fixture: ComponentFixture<MenuHeaderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuHeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
