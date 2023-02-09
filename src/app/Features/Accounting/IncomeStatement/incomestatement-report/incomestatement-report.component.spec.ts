import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomestatementReportComponent } from './incomestatement-report.component';

describe('IncomestatementReportComponent', () => {
  let component: IncomestatementReportComponent;
  let fixture: ComponentFixture<IncomestatementReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomestatementReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomestatementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
