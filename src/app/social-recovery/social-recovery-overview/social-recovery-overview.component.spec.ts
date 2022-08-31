import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRecoveryOverviewComponent } from './social-recovery-overview.component';

describe('SocialRecoveryOverviewComponent', () => {
  let component: SocialRecoveryOverviewComponent;
  let fixture: ComponentFixture<SocialRecoveryOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialRecoveryOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialRecoveryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
