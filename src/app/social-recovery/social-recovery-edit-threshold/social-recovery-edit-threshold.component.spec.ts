import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRecoveryEditThresholdComponent } from './social-recovery-edit-threshold.component';

describe('SocialRecoveryEditThresholdComponent', () => {
  let component: SocialRecoveryEditThresholdComponent;
  let fixture: ComponentFixture<SocialRecoveryEditThresholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialRecoveryEditThresholdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialRecoveryEditThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
