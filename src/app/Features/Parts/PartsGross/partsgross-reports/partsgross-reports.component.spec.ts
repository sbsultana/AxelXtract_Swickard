import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsgrossReportsComponent } from './partsgross-reports.component';

describe('PartsgrossReportsComponent', () => {
  let component: PartsgrossReportsComponent;
  let fixture: ComponentFixture<PartsgrossReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsgrossReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsgrossReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
