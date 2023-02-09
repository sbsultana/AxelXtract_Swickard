import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyactivityReportComponent } from './loyaltyactivity-report.component';

describe('LoyaltyactivityReportComponent', () => {
  let component: LoyaltyactivityReportComponent;
  let fixture: ComponentFixture<LoyaltyactivityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyaltyactivityReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyactivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
