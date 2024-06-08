import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuFooterPage } from './menu-footer.page';

describe('MenuFooterPage', () => {
  let component: MenuFooterPage;
  let fixture: ComponentFixture<MenuFooterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFooterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
