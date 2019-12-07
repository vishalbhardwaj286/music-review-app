import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHomePageComponent } from './search-home-page.component';

describe('SearchHomePageComponent', () => {
  let component: SearchHomePageComponent;
  let fixture: ComponentFixture<SearchHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
