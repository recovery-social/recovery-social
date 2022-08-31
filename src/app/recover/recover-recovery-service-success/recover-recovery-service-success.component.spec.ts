import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverRecoveryServiceSuccessComponent } from './recover-recovery-service-success.component';

describe('RecoverRecoveryServiceSuccessComponent', () => {
  let component: RecoverRecoveryServiceSuccessComponent;
  let fixture: ComponentFixture<RecoverRecoveryServiceSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverRecoveryServiceSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverRecoveryServiceSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
