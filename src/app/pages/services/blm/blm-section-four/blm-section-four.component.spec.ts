import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlmSectionFourComponent } from './blm-section-four.component';

describe('BlmSectionFourComponent', () => {
  let component: BlmSectionFourComponent;
  let fixture: ComponentFixture<BlmSectionFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlmSectionFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlmSectionFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
