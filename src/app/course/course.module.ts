import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { CourseTileComponent } from './components/course-tile/course-tile.component';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { RemoveCourseDialogComponent } from './dialogs/remove-course-dialog/remove-course-dialog.component';


@NgModule({
  declarations: [
    ListComponent,
    CourseTileComponent,
    ModuleListComponent,
    RemoveCourseDialogComponent
  ],
  imports: [
    SharedModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
