import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyactivityDetailsComponent } from './loyaltyactivity-details.component';

describe('LoyaltyactivityDetailsComponent', () => {
  let component: LoyaltyactivityDetailsComponent;
  let fixture: ComponentFixture<LoyaltyactivityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyaltyactivityDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyactivityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
