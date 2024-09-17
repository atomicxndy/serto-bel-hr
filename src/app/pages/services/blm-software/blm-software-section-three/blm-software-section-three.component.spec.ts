import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BlmSoftwareSectionThreeComponent } from "./blm-software-section-three.component";

describe("BlmSoftwareSectionThreeComponent", () => {
  let component: BlmSoftwareSectionThreeComponent;
  let fixture: ComponentFixture<BlmSoftwareSectionThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlmSoftwareSectionThreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlmSoftwareSectionThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
