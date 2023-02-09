import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightlysalesDealsComponent } from './nightlysales-deals.component';

describe('NightlysalesDealsComponent', () => {
  let component: NightlysalesDealsComponent;
  let fixture: ComponentFixture<NightlysalesDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightlysalesDealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NightlysalesDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
