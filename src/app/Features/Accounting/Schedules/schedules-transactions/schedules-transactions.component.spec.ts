import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesTransactionsComponent } from './schedules-transactions.component';

describe('SchedulesTransactionsComponent', () => {
  let component: SchedulesTransactionsComponent;
  let fixture: ComponentFixture<SchedulesTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulesTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
