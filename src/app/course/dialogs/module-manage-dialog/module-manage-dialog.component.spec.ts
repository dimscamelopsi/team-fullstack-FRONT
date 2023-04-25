import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleManageDialogComponent } from './module-manage-dialog.component';

describe('ModuleManageDialogComponent', () => {
  let component: ModuleManageDialogComponent;
  let fixture: ComponentFixture<ModuleManageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleManageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
