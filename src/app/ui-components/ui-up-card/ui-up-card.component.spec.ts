import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiUpCardComponent } from './ui-up-card.component';

describe('UiUpCardComponent', () => {
  let component: UiUpCardComponent;
  let fixture: ComponentFixture<UiUpCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiUpCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiUpCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
