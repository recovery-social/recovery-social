import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverProcessComponent } from './recover-process.component';

describe('RecoverProcessComponent', () => {
  let component: RecoverProcessComponent;
  let fixture: ComponentFixture<RecoverProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
