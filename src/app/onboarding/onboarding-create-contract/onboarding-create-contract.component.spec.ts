import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingCreateContractComponent } from './onboarding-create-contract.component';

describe('OnboardingCreateContractComponent', () => {
  let component: OnboardingCreateContractComponent;
  let fixture: ComponentFixture<OnboardingCreateContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingCreateContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingCreateContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
