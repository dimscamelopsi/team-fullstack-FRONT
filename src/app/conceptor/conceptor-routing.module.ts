import { Component, NgModule } from '@angular/core';
import { OutletContext, RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddModuleComponent } from './add-module/add-module.component';
import { ListComponent } from '../course/list/list.component';
<<<<<<< HEAD
import { AddMediaComponent } from './add-media/add-media.component';
=======
>>>>>>> 3405e93bab3d34491e9029297955fd1d3c1ebe08
import { CourseHandlerComponent } from '../course/course-handler/course-handler.component';

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
        path: 'addModule',
       component: AddModuleComponent
        },
        {
<<<<<<< HEAD
          path: 'addMedia',
          component: AddMediaComponent
        },
        {
=======
>>>>>>> 3405e93bab3d34491e9029297955fd1d3c1ebe08
        path: 'addCourse',
       component: CourseHandlerComponent
        },
        {
          path:'list',
          component:ListComponent
        }

      ]
    }

  ];
    }

