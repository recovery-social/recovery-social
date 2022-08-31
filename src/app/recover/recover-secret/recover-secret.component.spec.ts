import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverSecretComponent } from './recover-secret.component';

describe('RecoverSecretComponent', () => {
  let component: RecoverSecretComponent;
  let fixture: ComponentFixture<RecoverSecretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverSecretComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverSecretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
