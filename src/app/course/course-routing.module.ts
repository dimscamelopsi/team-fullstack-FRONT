import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseHandlerComponent } from './course-handler/course-handler.component';
import { ListComponent } from './list/list.component';
import { CoursesComponent } from '../dashboard/students/courses/courses.component';

@NgModule({
  imports: [RouterModule.forChild(CourseRoutingModule.routes)],
  exports: [RouterModule],
})
export class CourseRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: ListComponent,
    },
    {
      path: 'add',
      component: CourseHandlerComponent,
    },
    {
      path: 'sev',
      component: CoursesComponent,
    },
    {
      path: '**',
      redirectTo: 'list',
      pathMatch: 'full',
    },
  ];
}
