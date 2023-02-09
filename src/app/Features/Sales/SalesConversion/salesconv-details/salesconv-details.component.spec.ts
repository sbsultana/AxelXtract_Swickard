import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesconvDetailsComponent } from './salesconv-details.component';

describe('SalesconvDetailsComponent', () => {
  let component: SalesconvDetailsComponent;
  let fixture: ComponentFixture<SalesconvDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesconvDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesconvDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
