import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverRecoveryServiceShowComponent } from './recover-recovery-service-show.component';

describe('RecoverRecoveryServiceShowComponent', () => {
  let component: RecoverRecoveryServiceShowComponent;
  let fixture: ComponentFixture<RecoverRecoveryServiceShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverRecoveryServiceShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverRecoveryServiceShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
