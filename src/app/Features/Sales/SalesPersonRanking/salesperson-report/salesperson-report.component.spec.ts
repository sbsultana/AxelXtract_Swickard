import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespersonReportComponent } from './salesperson-report.component';

describe('SalespersonReportComponent', () => {
  let component: SalespersonReportComponent;
  let fixture: ComponentFixture<SalespersonReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalespersonReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespersonReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
