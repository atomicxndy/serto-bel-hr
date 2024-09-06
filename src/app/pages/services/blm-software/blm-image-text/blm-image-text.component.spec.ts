import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlmImageTextComponent } from './blm-image-text.component';

describe('BlmImageTextComponent', () => {
  let component: BlmImageTextComponent;
  let fixture: ComponentFixture<BlmImageTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlmImageTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlmImageTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
