import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingRightsComponent } from './onboarding-rights.component';

describe('OnboardingRightsComponent', () => {
  let component: OnboardingRightsComponent;
  let fixture: ComponentFixture<OnboardingRightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingRightsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
