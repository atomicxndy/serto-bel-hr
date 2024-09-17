import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BlmSectionOneComponent } from "./blm-section-one.component";

describe("BlmSectionOneComponent", () => {
  let component: BlmSectionOneComponent;
  let fixture: ComponentFixture<BlmSectionOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlmSectionOneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlmSectionOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
