import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesreconDetailsComponent } from './salesrecon-details.component';

describe('SalesreconDetailsComponent', () => {
  let component: SalesreconDetailsComponent;
  let fixture: ComponentFixture<SalesreconDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesreconDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesreconDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
