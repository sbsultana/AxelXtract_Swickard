import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightlysalesReportComponent } from './nightlysales-report.component';

describe('NightlysalesReportComponent', () => {
  let component: NightlysalesReportComponent;
  let fixture: ComponentFixture<NightlysalesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightlysalesReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NightlysalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
