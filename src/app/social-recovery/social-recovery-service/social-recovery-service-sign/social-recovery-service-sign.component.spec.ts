import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRecoveryRecoveryServiceSignComponent } from './social-recovery-service-sign.component';

describe('SocialRecoveryRecoveryServiceSignComponent', () => {
  let component: SocialRecoveryRecoveryServiceSignComponent;
  let fixture: ComponentFixture<SocialRecoveryRecoveryServiceSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialRecoveryRecoveryServiceSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialRecoveryRecoveryServiceSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
