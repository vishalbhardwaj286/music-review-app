import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHiddenSongsDialogComponent } from './view-hidden-songs-dialog.component';

describe('ViewHiddenSongsDialogComponent', () => {
  let component: ViewHiddenSongsDialogComponent;
  let fixture: ComponentFixture<ViewHiddenSongsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHiddenSongsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHiddenSongsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
