import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverRecoveryServiceProcessComponent } from './recover-recovery-service-process.component';

describe('RecoverRecoveryServiceProcessComponent', () => {
  let component: RecoverRecoveryServiceProcessComponent;
  let fixture: ComponentFixture<RecoverRecoveryServiceProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverRecoveryServiceProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverRecoveryServiceProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
