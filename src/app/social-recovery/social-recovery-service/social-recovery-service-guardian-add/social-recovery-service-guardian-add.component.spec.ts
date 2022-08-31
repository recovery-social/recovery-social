import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRecoveryRecoveryServiceGuardianAddComponent } from './social-recovery-service-guardian-add.component';

describe('SocialRecoveryRecoveryServiceGuardianAddComponent', () => {
  let component: SocialRecoveryRecoveryServiceGuardianAddComponent;
  let fixture: ComponentFixture<SocialRecoveryRecoveryServiceGuardianAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialRecoveryRecoveryServiceGuardianAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialRecoveryRecoveryServiceGuardianAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
