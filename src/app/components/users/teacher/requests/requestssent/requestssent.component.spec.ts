import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestssentComponent } from './requestssent.component';

describe('RequestssentComponent', () => {
  let component: RequestssentComponent;
  let fixture: ComponentFixture<RequestssentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestssentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestssentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
