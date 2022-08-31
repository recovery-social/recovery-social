import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingAddGuardiansComponent } from './onboarding-add-guardians.component';

describe('OnboardingAddGuardiansComponent', () => {
  let component: OnboardingAddGuardiansComponent;
  let fixture: ComponentFixture<OnboardingAddGuardiansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingAddGuardiansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingAddGuardiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
