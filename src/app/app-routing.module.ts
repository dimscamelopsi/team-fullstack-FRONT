import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './student/add/add.component';
import { ListComponent } from './student/list/list.component';
import { UpdateComponent } from './student/update/update.component';
import { AuthGuard } from './user/guards/auth.guard';
import { NewPasswordComponent } from './user/new-password/new-password.component';
import { LoginComponent } from './user/login/login.component';
import { ForgottenPasswordComponent } from './user/forgotten-password/forgotten-password.component';

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
      component: DashboardComponent,
      canActivate: [
        AuthGuard
      ]
    },
    {
      path: 'student/list',
      component: ListComponent,
      canActivate: [
        AuthGuard
      ]
    },
    {
      path: 'student/add',
      component: AddComponent,
      canActivate: [
        AuthGuard
      ]
    },
    {
      path: 'student/:id/update', // :id => sera remplacé par l'ID d'un Student à l'exécution
      component: UpdateComponent,
      canActivate: [
        AuthGuard
      ]
    },
    {
      path: 'forgottenPassword',
      component: ForgottenPasswordComponent
    },
    {
      path: 'newPassword',
      component: NewPasswordComponent
    },
    {
      path: 'course',
      loadChildren: () => import('./course/course.module').then((m) => m.CourseModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    },
    {
      path: 'conceptor',
      loadChildren: () => import('./conceptor/conceptor.module').then((m) => m.ConceptorModule)
    },
    {
      path: '**',
      redirectTo: 'dashboard', // Or any 404  component you want !
      pathMatch: 'full'
    }
  ]
}
