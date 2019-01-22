import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformancegraphComponent } from './performancegraph.component';

describe('PerformancegraphComponent', () => {
  let component: PerformancegraphComponent;
  let fixture: ComponentFixture<PerformancegraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformancegraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformancegraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
