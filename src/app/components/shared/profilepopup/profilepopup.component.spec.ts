import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilepopupComponent } from './profilepopup.component';

describe('ProfilepopupComponent', () => {
  let component: ProfilepopupComponent;
  let fixture: ComponentFixture<ProfilepopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilepopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
