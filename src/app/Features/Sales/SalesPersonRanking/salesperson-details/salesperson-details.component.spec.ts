import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonDetailsComponent } from './salesperson-details.component';

describe('SalespersonDetailsComponent', () => {
  let component: SalespersonDetailsComponent;
  let fixture: ComponentFixture<SalespersonDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalespersonDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
