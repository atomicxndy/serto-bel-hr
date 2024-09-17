import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BlmSoftwareSectionOneComponent } from "./blm-software-section-one.component";

describe("BlmSoftwareSectionOneComponent", () => {
  let component: BlmSoftwareSectionOneComponent;
  let fixture: ComponentFixture<BlmSoftwareSectionOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlmSoftwareSectionOneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlmSoftwareSectionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
