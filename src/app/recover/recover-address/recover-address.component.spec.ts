import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverAddressComponent } from './recover-address.component';

describe('RecoverAddressComponent', () => {
  let component: RecoverAddressComponent;
  let fixture: ComponentFixture<RecoverAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
