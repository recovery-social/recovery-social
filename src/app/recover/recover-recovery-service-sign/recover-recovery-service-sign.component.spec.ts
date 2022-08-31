import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverRecoveryServiceSignComponent } from './recover-recovery-service-sign.component';

describe('RecoverRecoveryServiceSignComponent', () => {
  let component: RecoverRecoveryServiceSignComponent;
  let fixture: ComponentFixture<RecoverRecoveryServiceSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverRecoveryServiceSignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverRecoveryServiceSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
