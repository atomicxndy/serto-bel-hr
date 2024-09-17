import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BlmSectionTwoComponent } from "./blm-section-two.component";

describe("BlmSectionTwoComponent", () => {
  let component: BlmSectionTwoComponent;
  let fixture: ComponentFixture<BlmSectionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlmSectionTwoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlmSectionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
