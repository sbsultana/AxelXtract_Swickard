import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicegrossReportsComponent } from './servicegross-reports.component';

describe('ServicegrossReportsComponent', () => {
  let component: ServicegrossReportsComponent;
  let fixture: ComponentFixture<ServicegrossReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicegrossReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicegrossReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
