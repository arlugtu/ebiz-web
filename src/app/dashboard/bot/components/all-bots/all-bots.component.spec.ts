import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBotsComponent } from './all-bots.component';

describe('AllBotsComponent', () => {
  let component: AllBotsComponent;
  let fixture: ComponentFixture<AllBotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllBotsComponent]
    });
    fixture = TestBed.createComponent(AllBotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
