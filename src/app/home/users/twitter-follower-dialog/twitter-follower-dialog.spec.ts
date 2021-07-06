import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterFollowerDialog } from './twitter-follower-dialog';

describe('TwitterFollowerDialogComponent', () => {
  let component: TwitterFollowerDialog;
  let fixture: ComponentFixture<TwitterFollowerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TwitterFollowerDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterFollowerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
