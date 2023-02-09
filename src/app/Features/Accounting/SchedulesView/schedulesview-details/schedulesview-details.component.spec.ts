import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesviewDetailsComponent } from './schedulesview-details.component';

describe('SchedulesviewDetailsComponent', () => {
  let component: SchedulesviewDetailsComponent;
  let fixture: ComponentFixture<SchedulesviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulesviewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
