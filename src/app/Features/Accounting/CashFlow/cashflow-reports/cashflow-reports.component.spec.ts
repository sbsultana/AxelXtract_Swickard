import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashflowReportsComponent } from './cashflow-reports.component';

describe('CashflowReportsComponent', () => {
  let component: CashflowReportsComponent;
  let fixture: ComponentFixture<CashflowReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashflowReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashflowReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
