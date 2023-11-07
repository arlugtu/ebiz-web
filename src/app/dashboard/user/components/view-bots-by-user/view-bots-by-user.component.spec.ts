import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBotsByUserComponent } from './view-bots-by-user.component';

describe('ViewBotsByUserComponent', () => {
  let component: ViewBotsByUserComponent;
  let fixture: ComponentFixture<ViewBotsByUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBotsByUserComponent]
    });
    fixture = TestBed.createComponent(ViewBotsByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
