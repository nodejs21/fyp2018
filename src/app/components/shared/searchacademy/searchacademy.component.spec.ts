import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchacademyComponent } from './searchacademy.component';

describe('SearchacademyComponent', () => {
  let component: SearchacademyComponent;
  let fixture: ComponentFixture<SearchacademyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchacademyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchacademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
