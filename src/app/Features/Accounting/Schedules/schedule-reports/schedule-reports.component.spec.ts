import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleReportsComponent } from './schedule-reports.component';

describe('ScheduleReportsComponent', () => {
  let component: ScheduleReportsComponent;
  let fixture: ComponentFixture<ScheduleReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
