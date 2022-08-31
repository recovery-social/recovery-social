import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteForNewOwnerComponent } from './vote-for-new-owner.component';

describe('VoteForNewOwnerComponent', () => {
  let component: VoteForNewOwnerComponent;
  let fixture: ComponentFixture<VoteForNewOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteForNewOwnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteForNewOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
