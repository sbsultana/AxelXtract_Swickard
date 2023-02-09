import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesconvReportComponent } from './salesconv-report.component';

describe('SalesconvReportComponent', () => {
  let component: SalesconvReportComponent;
  let fixture: ComponentFixture<SalesconvReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesconvReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesconvReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
