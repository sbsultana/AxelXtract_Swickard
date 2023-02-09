import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesgrossReportsComponent } from './salesgross-reports.component';

describe('SalesgrossReportsComponent', () => {
  let component: SalesgrossReportsComponent;
  let fixture: ComponentFixture<SalesgrossReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesgrossReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesgrossReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
