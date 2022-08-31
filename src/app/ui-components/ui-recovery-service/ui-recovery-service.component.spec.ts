import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiRecoveryServiceComponent } from './ui-recovery-service.component';

describe('UiRecoveryServiceComponent', () => {
  let component: UiRecoveryServiceComponent;
  let fixture: ComponentFixture<UiRecoveryServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiRecoveryServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiRecoveryServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
