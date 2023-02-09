import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyReportComponent } from './loyalty-report.component';

describe('LoyaltyReportComponent', () => {
  let component: LoyaltyReportComponent;
  let fixture: ComponentFixture<LoyaltyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyaltyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
