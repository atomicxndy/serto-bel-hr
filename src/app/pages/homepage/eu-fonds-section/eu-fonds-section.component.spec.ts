import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EuFondsSectionComponent } from './eu-fonds-section.component';

describe('EuFondsSectionComponent', () => {
  let component: EuFondsSectionComponent;
  let fixture: ComponentFixture<EuFondsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EuFondsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EuFondsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
