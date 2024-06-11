import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyOutletsPage } from './my-outlets.page';

describe('MyOutletsPage', () => {
  let component: MyOutletsPage;
  let fixture: ComponentFixture<MyOutletsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOutletsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
