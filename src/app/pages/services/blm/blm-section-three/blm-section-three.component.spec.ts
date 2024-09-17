import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BlmSectionThreeComponent } from "./blm-section-three.component";

describe("BlmSectionThreeComponent", () => {
  let component: BlmSectionThreeComponent;
  let fixture: ComponentFixture<BlmSectionThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlmSectionThreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlmSectionThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
