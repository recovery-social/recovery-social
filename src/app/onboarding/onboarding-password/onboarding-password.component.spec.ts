import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingPasswordComponent } from './onboarding-password.component';

describe('OnboardingPasswordComponent', () => {
  let component: OnboardingPasswordComponent;
  let fixture: ComponentFixture<OnboardingPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
