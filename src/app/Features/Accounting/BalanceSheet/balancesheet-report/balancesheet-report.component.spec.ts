import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancesheetReportComponent } from './balancesheet-report.component';

describe('BalancesheetReportComponent', () => {
  let component: BalancesheetReportComponent;
  let fixture: ComponentFixture<BalancesheetReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalancesheetReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancesheetReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
