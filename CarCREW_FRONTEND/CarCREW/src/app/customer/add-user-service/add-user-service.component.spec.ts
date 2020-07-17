import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserServiceComponent } from './add-user-service.component';

describe('AddUserServiceComponent', () => {
  let component: AddUserServiceComponent;
  let fixture: ComponentFixture<AddUserServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
