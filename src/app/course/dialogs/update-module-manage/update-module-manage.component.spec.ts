import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModuleManageComponent } from './update-module-manage.component';

describe('UpdateModuleManageComponent', () => {
  let component: UpdateModuleManageComponent;
  let fixture: ComponentFixture<UpdateModuleManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateModuleManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateModuleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
