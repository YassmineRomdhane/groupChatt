import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSProfileComponent } from './user-s-profile.component';

describe('UserSProfileComponent', () => {
  let component: UserSProfileComponent;
  let fixture: ComponentFixture<UserSProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
