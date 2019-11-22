import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPlaylistComponent } from './create-new-playlist.component';

describe('CreateNewPlaylistComponent', () => {
  let component: CreateNewPlaylistComponent;
  let fixture: ComponentFixture<CreateNewPlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewPlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
