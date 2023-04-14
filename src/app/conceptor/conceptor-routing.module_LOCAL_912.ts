import { Component, NgModule } from '@angular/core';
import { OutletContext, RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';

import { AddModuleComponent } from './add-module/add-module.component';

import { ListComponent } from '../course/list/list.component';

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
          path:'list',
          component:ListComponent
        }

      ]
    }

  ];
}
