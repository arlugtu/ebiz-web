import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpicyImageUploadComponent } from './spicy-image-upload.component';

describe('SpicyImageUploadComponent', () => {
  let component: SpicyImageUploadComponent;
  let fixture: ComponentFixture<SpicyImageUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpicyImageUploadComponent]
    });
    fixture = TestBed.createComponent(SpicyImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
