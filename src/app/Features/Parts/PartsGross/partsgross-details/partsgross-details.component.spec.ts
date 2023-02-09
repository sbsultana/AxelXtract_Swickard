import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsgrossDetailsComponent } from './partsgross-details.component';

describe('PartsgrossDetailsComponent', () => {
  let component: PartsgrossDetailsComponent;
  let fixture: ComponentFixture<PartsgrossDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartsgrossDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsgrossDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
