import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthgraphComponent } from './strengthgraph.component';

describe('StrengthgraphComponent', () => {
  let component: StrengthgraphComponent;
  let fixture: ComponentFixture<StrengthgraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrengthgraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrengthgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
