import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaComponent } from './prima.component';

describe('PrimaComponent', () => {
  let component: PrimaComponent;
  let fixture: ComponentFixture<PrimaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
