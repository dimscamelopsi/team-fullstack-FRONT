import { Component, NgModule } from '@angular/core';
import { OutletContext, RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListComponent } from '../course/list/list.component';



@NgModule({
  imports: [RouterModule.forChild(ConceptorRoutingModule.routes)],
  exports: [RouterModule]
})
export class ConceptorRoutingModule {
  public static routes: Routes = [
    {
      path:'',
      component:SidebarComponent
    },
    {
      path:'list',
      component: ListComponent,
      outlet: 'global'
    }

  ];
 }
