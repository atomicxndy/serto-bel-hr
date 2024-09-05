import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlmSoftwareComponent } from './blm-software.component';

describe('BlmSoftwareComponent', () => {
  let component: BlmSoftwareComponent;
  let fixture: ComponentFixture<BlmSoftwareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlmSoftwareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlmSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
