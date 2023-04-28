import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { CourseTileComponent } from './components/course-tile/course-tile.component';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { RemoveCourseDialogComponent } from './dialogs/remove-course-dialog/remove-course-dialog.component';
import { CourseHandlerComponent } from './course-handler/course-handler.component';
import { ModuleAddComponent } from './dialogs/module-add/module-add.component';
import { CourseDialogComponent } from './dialogs/course-dialog/course-dialog.component';
import { ModuleDialogComponent } from './dialogs/module-dialog/module-dialog.component';
import { ManageCourseComponent } from './components/manage-course/manage-course.component';
import { UpdateCourseManageComponent } from './dialogs/update-course-manage/update-course-manage.component';
import { ManageModuleComponent } from './components/manage-module/manage-module.component';
import { ModuleManageDialogComponent } from './dialogs/module-manage-dialog/module-manage-dialog.component';
import { CourseManageDialogComponent } from './dialogs/course-manage-dialog/course-manage-dialog.component';
import { UpdateModuleManageComponent } from './dialogs/update-module-manage/update-module-manage.component';
import { AddModuleManageComponent } from './dialogs/add-module-manage/add-module-manage.component';


@NgModule({
  declarations: [
    ListComponent,
    CourseTileComponent,
    ModuleListComponent,
    RemoveCourseDialogComponent,
    CourseHandlerComponent,
    ModuleAddComponent,
    CourseDialogComponent,
    ModuleDialogComponent,
    ManageCourseComponent,
    CourseDialogComponent,
    UpdateCourseManageComponent,
    ModuleDialogComponent,
    ManageModuleComponent,
    ModuleManageDialogComponent,
    CourseManageDialogComponent,
    UpdateModuleManageComponent,
    AddModuleManageComponent
  ],
  imports: [
    SharedModule,
    CourseRoutingModule
  ],
  exports: [
    ListComponent
  ]

})
export class CourseModule { }
