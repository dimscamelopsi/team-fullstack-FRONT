import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModuleManageComponent } from './add-module-manage.component';

describe('AddModuleManageComponent', () => {
  let component: AddModuleManageComponent;
  let fixture: ComponentFixture<AddModuleManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddModuleManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModuleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
