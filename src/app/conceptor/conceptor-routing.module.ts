import { Component, NgModule } from '@angular/core';
import { OutletContext, RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

import { AddModuleComponent } from './modules/add-module/add-module.component';

import { ListComponent } from '../course/list/list.component';
import { CourseHandlerComponent } from '../course/course-handler/course-handler.component';
import { ManageCourseComponent } from '../course/components/manage-course/manage-course.component';
import { ManageModuleComponent } from '../course/components/manage-module/manage-module.component';



@NgModule({
  imports: [RouterModule.forChild(ConceptorRoutingModule.routes)],
  exports: [RouterModule]
})
export class ConceptorRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      component: SidebarComponent, children:[
        {
        path: 'addCourse',
       component: CourseHandlerComponent
        },
        {
          path:'list',
          component:ListComponent
        },
        {
          path: 'manageCourse',
          component: ManageCourseComponent
        },
        {
          path: 'manageModule',
          component: ManageModuleComponent
        }

      ]
    }

  ];
 }
