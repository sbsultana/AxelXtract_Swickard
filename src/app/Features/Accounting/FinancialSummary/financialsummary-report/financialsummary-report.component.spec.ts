import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsummaryReportComponent } from './financialsummary-report.component';

describe('FinancialsummaryReportComponent', () => {
  let component: FinancialsummaryReportComponent;
  let fixture: ComponentFixture<FinancialsummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialsummaryReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialsummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
