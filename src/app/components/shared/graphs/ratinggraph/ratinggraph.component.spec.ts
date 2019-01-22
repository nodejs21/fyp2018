import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatinggraphComponent } from './ratinggraph.component';

describe('RatinggraphComponent', () => {
  let component: RatinggraphComponent;
  let fixture: ComponentFixture<RatinggraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatinggraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatinggraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
