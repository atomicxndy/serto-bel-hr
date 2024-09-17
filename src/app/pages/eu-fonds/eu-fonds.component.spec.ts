import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EuFondsComponent } from "./eu-fonds.component";

describe("EuFondsComponent", () => {
  let component: EuFondsComponent;
  let fixture: ComponentFixture<EuFondsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EuFondsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EuFondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
