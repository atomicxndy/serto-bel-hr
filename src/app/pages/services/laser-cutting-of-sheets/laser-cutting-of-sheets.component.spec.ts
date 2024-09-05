import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaserCuttingOfSheetsComponent } from './laser-cutting-of-sheets.component';

describe('LaserCuttingOfSheetsComponent', () => {
  let component: LaserCuttingOfSheetsComponent;
  let fixture: ComponentFixture<LaserCuttingOfSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaserCuttingOfSheetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaserCuttingOfSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
