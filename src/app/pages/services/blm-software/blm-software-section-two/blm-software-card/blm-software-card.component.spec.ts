import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlmSoftwareCardComponent } from './blm-software-card.component';

describe('BlmSoftwareCardComponent', () => {
  let component: BlmSoftwareCardComponent;
  let fixture: ComponentFixture<BlmSoftwareCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlmSoftwareCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlmSoftwareCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
