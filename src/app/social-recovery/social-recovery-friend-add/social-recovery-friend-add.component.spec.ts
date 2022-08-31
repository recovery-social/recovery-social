import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRecoveryFriendAddComponent } from './social-recovery-friend-add.component';

describe('SocialRecoveryFriendAddComponent', () => {
  let component: SocialRecoveryFriendAddComponent;
  let fixture: ComponentFixture<SocialRecoveryFriendAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialRecoveryFriendAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialRecoveryFriendAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
