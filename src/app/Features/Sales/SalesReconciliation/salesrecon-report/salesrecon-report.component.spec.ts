import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesreconReportComponent } from './salesrecon-report.component';

describe('SalesreconReportComponent', () => {
  let component: SalesreconReportComponent;
  let fixture: ComponentFixture<SalesreconReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesreconReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesreconReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
