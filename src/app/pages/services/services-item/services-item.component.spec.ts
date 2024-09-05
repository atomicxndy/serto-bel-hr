import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesItemComponent } from './services-item.component';

describe('ServicesItemComponent', () => {
  let component: ServicesItemComponent;
  let fixture: ComponentFixture<ServicesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
