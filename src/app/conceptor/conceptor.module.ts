import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConceptorRoutingModule } from './conceptor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UiModule } from '../ui/ui.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddModuleComponent } from './add-module/add-module.component';
import { CourseModule } from '../course/course.module';
import { CourseHandlerComponent } from '../course/course-handler/course-handler.component';

@NgModule({
  declarations: [
    SidebarComponent,
    AddModuleComponent
  ],
  imports: [
    CommonModule,
    ConceptorRoutingModule,
    SharedModule,
    UiModule,
    CourseModule,


  ]
})
export class ConceptorModule { }
