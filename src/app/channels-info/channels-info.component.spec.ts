import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsInfoComponent } from './channels-info.component';

describe('ChannelsInfoComponent', () => {
  let component: ChannelsInfoComponent;
  let fixture: ComponentFixture<ChannelsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChannelsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
