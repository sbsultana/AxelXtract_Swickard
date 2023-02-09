import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialsummaryDetailsComponent } from './financialsummary-details.component';

describe('FinancialsummaryDetailsComponent', () => {
  let component: FinancialsummaryDetailsComponent;
  let fixture: ComponentFixture<FinancialsummaryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialsummaryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialsummaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
