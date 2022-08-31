import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingGuardiansComponent } from './onboarding-guardians.component';

describe('OnboardingGuardiansComponent', () => {
  let component: OnboardingGuardiansComponent;
  let fixture: ComponentFixture<OnboardingGuardiansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingGuardiansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingGuardiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
