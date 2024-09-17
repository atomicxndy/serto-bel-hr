import { ComponentFixture, TestBed } from "@angular/core/testing";

import { BystronicComponent } from "./bystronic.component";

describe("BystronicComponent", () => {
  let component: BystronicComponent;
  let fixture: ComponentFixture<BystronicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BystronicComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BystronicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
