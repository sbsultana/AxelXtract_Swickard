import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialstatementDetailsComponent } from './financialstatement-details.component';

describe('FinancialstatementDetailsComponent', () => {
  let component: FinancialstatementDetailsComponent;
  let fixture: ComponentFixture<FinancialstatementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialstatementDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialstatementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
