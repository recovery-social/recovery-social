import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRecoveryEditPasswordComponent } from './social-recovery-edit-password.component';

describe('SocialRecoveryEditPasswordComponent', () => {
  let component: SocialRecoveryEditPasswordComponent;
  let fixture: ComponentFixture<SocialRecoveryEditPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialRecoveryEditPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialRecoveryEditPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
