import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  imports: [RouterModule.forChild(ConceptorRoutingModule.routes)],
  exports: [RouterModule]
})
export class ConceptorRoutingModule {
  public static routes: Routes = [
    {
      path:'',
      component:SidebarComponent
    }

  ];
 }
