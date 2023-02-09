import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorplanreconDetailsComponent } from './floorplanrecon-details.component';

describe('FloorplanreconDetailsComponent', () => {
  let component: FloorplanreconDetailsComponent;
  let fixture: ComponentFixture<FloorplanreconDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorplanreconDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorplanreconDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
