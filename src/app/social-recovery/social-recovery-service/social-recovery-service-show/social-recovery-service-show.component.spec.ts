import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRecoveryRecoveryServiceShowComponent } from './social-recovery-service-show.component';

describe('SocialRecoveryRecoveryServiceShowComponent', () => {
  let component: SocialRecoveryRecoveryServiceShowComponent;
  let fixture: ComponentFixture<SocialRecoveryRecoveryServiceShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialRecoveryRecoveryServiceShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialRecoveryRecoveryServiceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
