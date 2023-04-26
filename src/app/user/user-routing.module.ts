import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';

@NgModule({
  imports: [RouterModule.forChild(UserRoutingModule.routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [NoAuthGuard]
    },
    {
      path: '**',
      redirectTo: 'login',
      pathMatch: 'full'
    }
  ]
}
