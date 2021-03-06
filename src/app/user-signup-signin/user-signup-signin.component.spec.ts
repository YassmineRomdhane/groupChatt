import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignupSigninComponent } from './user-signup-signin.component';

describe('UserSignupSigninComponent', () => {
  let component: UserSignupSigninComponent;
  let fixture: ComponentFixture<UserSignupSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSignupSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignupSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
