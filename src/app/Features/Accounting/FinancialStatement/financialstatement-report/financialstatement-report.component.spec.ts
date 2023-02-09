import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialstatementReportComponent } from './financialstatement-report.component';

describe('FinancialstatementReportComponent', () => {
  let component: FinancialstatementReportComponent;
  let fixture: ComponentFixture<FinancialstatementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialstatementReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialstatementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
