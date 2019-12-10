import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDialogComponentFromHomePageComponent } from './playlist-dialog-component-from-home-page.component';

describe('PlaylistDialogComponentFromHomePageComponent', () => {
  let component: PlaylistDialogComponentFromHomePageComponent;
  let fixture: ComponentFixture<PlaylistDialogComponentFromHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistDialogComponentFromHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistDialogComponentFromHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
