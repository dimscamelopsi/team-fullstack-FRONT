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
import { ManageCourseComponent } from './components/manage-course/manage-course.component';
import { CourseDialogComponent } from './dialogs/course-dialog/course-dialog.component';
import { ModuleDialogComponent } from './dialogs/module-dialog/module-dialog.component';
import { UpdateCourseManageComponent } from './dialogs/update-course-manage/update-course-manage.component';
import { ManageModuleComponent } from './components/manage-module/manage-module.component';


@NgModule({
  declarations: [
    ListComponent,
    CourseTileComponent,
    ModuleListComponent,
    RemoveCourseDialogComponent,
    CourseHandlerComponent,
    ModuleAddComponent,
    ManageCourseComponent,
    CourseDialogComponent,
    UpdateCourseManageComponent,
    ModuleDialogComponent,
    ManageModuleComponent
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
