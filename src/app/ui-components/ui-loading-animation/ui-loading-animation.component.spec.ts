import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiLoadingAnimationComponent } from './ui-loading-animation.component';

describe('UiLoadingAnimationComponent', () => {
  let component: UiLoadingAnimationComponent;
  let fixture: ComponentFixture<UiLoadingAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiLoadingAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiLoadingAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
