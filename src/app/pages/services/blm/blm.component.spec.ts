import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlmComponent } from './blm.component';

describe('BlmComponent', () => {
  let component: BlmComponent;
  let fixture: ComponentFixture<BlmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
