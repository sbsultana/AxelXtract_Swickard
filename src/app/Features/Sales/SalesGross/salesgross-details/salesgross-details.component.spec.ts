import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesgrossDetailsComponent } from './salesgross-details.component';

describe('SalesgrossDetailsComponent', () => {
  let component: SalesgrossDetailsComponent;
  let fixture: ComponentFixture<SalesgrossDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesgrossDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesgrossDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
