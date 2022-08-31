import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSuccessComponent } from './onboarding-success.component';

describe('OnboardingSuccessComponent', () => {
  let component: OnboardingSuccessComponent;
  let fixture: ComponentFixture<OnboardingSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
