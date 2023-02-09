import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitReportsComponent } from './cit-reports.component';

describe('CitReportsComponent', () => {
  let component: CitReportsComponent;
  let fixture: ComponentFixture<CitReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
