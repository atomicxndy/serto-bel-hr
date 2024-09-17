import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BystronicImagesComponent } from "./bystronic-images.component";

describe("BystronicImagesComponent", () => {
  let component: BystronicImagesComponent;
  let fixture: ComponentFixture<BystronicImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BystronicImagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BystronicImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
