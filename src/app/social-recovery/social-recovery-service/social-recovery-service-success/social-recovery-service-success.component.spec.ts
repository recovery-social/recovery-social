import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRecoveryRecoveryServiceSuccessComponent } from './social-recovery-service-success.component';

describe('SocialRecoveryRecoveryServiceSuccessComponent', () => {
  let component: SocialRecoveryRecoveryServiceSuccessComponent;
  let fixture: ComponentFixture<SocialRecoveryRecoveryServiceSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialRecoveryRecoveryServiceSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialRecoveryRecoveryServiceSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
