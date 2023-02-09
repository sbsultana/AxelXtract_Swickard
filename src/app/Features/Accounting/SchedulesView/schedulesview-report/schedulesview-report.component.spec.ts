import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesviewReportComponent } from './schedulesview-report.component';

describe('SchedulesviewReportComponent', () => {
  let component: SchedulesviewReportComponent;
  let fixture: ComponentFixture<SchedulesviewReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulesviewReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesviewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
