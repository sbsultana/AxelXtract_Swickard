import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountmappingReportComponent } from './accountmapping-report.component';

describe('AccountmappingReportComponent', () => {
  let component: AccountmappingReportComponent;
  let fixture: ComponentFixture<AccountmappingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountmappingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountmappingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
