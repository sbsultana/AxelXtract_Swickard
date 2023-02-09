import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitAnalyseComponent } from './cit-analyse.component';

describe('CitAnalyseComponent', () => {
  let component: CitAnalyseComponent;
  let fixture: ComponentFixture<CitAnalyseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitAnalyseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
