import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSetThresholdComponent } from './onboarding-set-threshold.component';

describe('OnboardingSetThresholdComponent', () => {
  let component: OnboardingSetThresholdComponent;
  let fixture: ComponentFixture<OnboardingSetThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingSetThresholdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingSetThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
