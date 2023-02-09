import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicegrossDetailsComponent } from './servicegross-details.component';

describe('ServicegrossDetailsComponent', () => {
  let component: ServicegrossDetailsComponent;
  let fixture: ComponentFixture<ServicegrossDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicegrossDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicegrossDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
