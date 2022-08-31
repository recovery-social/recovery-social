import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeStageComponent } from './theme-stage.component';

describe('ThemeStageComponent', () => {
  let component: ThemeStageComponent;
  let fixture: ComponentFixture<ThemeStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeStageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
