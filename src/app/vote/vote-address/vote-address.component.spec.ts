import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteAddressComponent } from './vote-address.component';

describe('VoteAddressComponent', () => {
  let component: VoteAddressComponent;
  let fixture: ComponentFixture<VoteAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoteAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
