import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BlmSoftwareSectionTwoComponent } from "./blm-software-section-two.component";

describe("BlmSoftwareSectionTwoComponent", () => {
  let component: BlmSoftwareSectionTwoComponent;
  let fixture: ComponentFixture<BlmSoftwareSectionTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlmSoftwareSectionTwoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlmSoftwareSectionTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
