import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LaserCuttingOfPipesComponent } from "./laser-cutting-of-pipes.component";

describe("LaserCuttingOfPipesComponent", () => {
  let component: LaserCuttingOfPipesComponent;
  let fixture: ComponentFixture<LaserCuttingOfPipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaserCuttingOfPipesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LaserCuttingOfPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
