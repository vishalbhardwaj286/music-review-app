import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllPlaylistsComponent } from './view-all-playlists.component';

describe('ViewAllPlaylistsComponent', () => {
  let component: ViewAllPlaylistsComponent;
  let fixture: ComponentFixture<ViewAllPlaylistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllPlaylistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
