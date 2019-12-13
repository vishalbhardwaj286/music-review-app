import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantPriviligeToUsersComponent } from './grant-privilige-to-users.component';

describe('GrantPriviligeToUsersComponent', () => {
  let component: GrantPriviligeToUsersComponent;
  let fixture: ComponentFixture<GrantPriviligeToUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantPriviligeToUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantPriviligeToUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
