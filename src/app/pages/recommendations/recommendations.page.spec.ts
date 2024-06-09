import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendationsPage } from './recommendations.page';

describe('RecommendationsPage', () => {
  let component: RecommendationsPage;
  let fixture: ComponentFixture<RecommendationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
