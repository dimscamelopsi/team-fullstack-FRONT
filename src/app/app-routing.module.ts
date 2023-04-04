import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './student/add/add.component';
import { ListComponent } from './student/list/list.component';
import { UpdateComponent } from './student/update/update.component';

@NgModule({
  imports: [RouterModule.forRoot(AppRoutingModule.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public static readonly routes: Routes = [
    {
      path: '', // Mean : http://localhost:4200
      redirectTo: 'dashboard', // Redirect to another Route object
      pathMatch: 'full' // Mean Angular read the whole URI instead of first matching occ
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'student/list',
      component: ListComponent
    },
    {
      path: 'student/add',
      component: AddComponent
    },
    {
      path: 'student/:id/update', // :id => sera remplacé par l'ID d'un Student à l'exécution
      component: UpdateComponent
    },
    {
      path: 'course',
      loadChildren: () => import('./course/course.module').then((m) => m.CourseModule)
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
    },
    {
      path: '**',
      redirectTo: 'dashboard', // Or any 404  component you want !
      pathMatch: 'full'
    }
  ]
}
