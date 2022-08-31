import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRecoveryRecoveryServiceAddComponent } from './social-recovery-service-add.component';

describe('SocialRecoveryRecoveryServiceAddComponent', () => {
  let component: SocialRecoveryRecoveryServiceAddComponent;
  let fixture: ComponentFixture<SocialRecoveryRecoveryServiceAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialRecoveryRecoveryServiceAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialRecoveryRecoveryServiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
