import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BendingOfSheetsComponent } from "./bending-of-sheets.component";

describe("BendingOfSheetsComponent", () => {
  let component: BendingOfSheetsComponent;
  let fixture: ComponentFixture<BendingOfSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BendingOfSheetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BendingOfSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
